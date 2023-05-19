const Product = require("../model/Product");
const User = require("../model/User");
const Order = require("../model/Order");
const Sale = require("../model/Sale");

const getCountProducts = async (req, res) => {
  try {
    const result = await Product.aggregate([
      {
        $match: { status: "accepted" },
      },
      {
        $group: {
          _id: "$user",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: 10,
      },
    ]);

    const userIds = result.map((item) => item._id);
    const users = await User.aggregate([
      {
        $match: { _id: { $in: userIds } },
      },
      {
        $project: {
          _id: 1,
          firstname: 1,
          lastname: 1,
        },
      },
      {
        $lookup: {
          from: "products",
          let: { userId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$user", "$$userId"] },
                    { $eq: ["$status", "accepted"] },
                  ],
                },
              },
            },
          ],
          as: "productCount",
        },
      },
      {
        $addFields: {
          productCount: { $size: "$productCount" },
        },
      },
    ]);

    const response = users.map((user) => {
      return {
        firstname: user.firstname,
        lastname: user.lastname,
        productCount: user.productCount,
      };
    });

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener la información" });
  }
};

const getTopCustomers = async (req, res) => {
  const { startDate, endDate } = req.body;
  if (!startDate || !endDate)
    return res.status(400).json({ message: "Date range is required" });
  try {
    const result = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(startDate),
            $lte: new Date(endDate + "T23:59:59.999Z"),
          },
        },
      },
      {
        $group: {
          _id: "$user",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: 10,
      },
    ]);

    const userIds = result.map((item) => item._id);
    const users = await User.find({ _id: { $in: userIds } });

    const response = users.map((user) => {
      const orderCount = result.find(
        (item) => item._id.toString() === user._id.toString()
      ).count;
      return {
        firstname: user.firstname,
        lastname: user.lastname,
        orderCount,
      };
    });

    res.json(response);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error al obtener los clientes con más pedidos" });
  }
};

const getTopSoldProducts = async (req, res) => {
  const { startDate, endDate } = req.body;
  if (!startDate || !endDate)
    return res.status(400).json({ message: "Date range is required" });
  try {
    const result = await Sale.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(startDate),
            $lte: new Date(endDate + "T23:59:59.999Z"),
          },
        },
      },
      {
        $unwind: "$products",
      },
      {
        $group: {
          _id: "$products.product",
          countSale: { $sum: "$products.quantity" },
        },
      },
      {
        $sort: { countSale: -1 },
      },
      {
        $limit: 10,
      },
    ]);

    const productIds = result.map((item) => item._id);
    const products = await Product.find({ _id: { $in: productIds } }).populate(
      "user",
      "firstname lastname"
    );

    const response = result.map((item) => {
      const product = products.find(
        (p) => p._id.toString() === item._id.toString()
      );
      const total = item.countSale * product.price;
      return {
        name: product.name,
        user: product.user,
        price: product.price,
        countSale: item.countSale,
        companyProfit: total * 0.05,
        userProfit: total * 0.95,
      };
    });

    res.json(response);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error al obtener los productos más vendidos" });
  }
};

const getTopCustomersByProfit = async (req, res) => {
    const { startDate, endDate } = req.body;
  
    try {
      const result = await Sale.aggregate([
        {
          $match: {
            date: {
              $gte: new Date(startDate),
              $lte: new Date(new Date(endDate).setHours(23, 59, 59, 999)),
            },
          },
        },
        {
          $unwind: "$products",
        },
        {
          $lookup: {
            from: "products",
            localField: "products.product",
            foreignField: "_id",
            as: "product",
          },
        },
        {
          $unwind: "$product",
        },
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $unwind: "$user",
        },
        {
          $group: {
            _id: "$user",
            profit: {
              $sum: { $multiply: ["$products.quantity", "$product.price"] },
            },
          },
        },
        {
          $project: {
            _id: 0,
            firstname: "$_id.firstname",
            lastname: "$_id.lastname",
            profit: 1,
          },
        },
        {
          $sort: { profit: -1 },
        },
        {
          $limit: 5,
        },
      ]);
      const response = result.map(item => {
        return {
            firstname: item.firstname,
            lastname: item.lastname,
            userProfit: item.profit * 0.95,
            companyProfit: item.profit * 0.05,
        }
      })
      res.json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener los clientes con más ganancias" });
    }
  };

module.exports = {
  getCountProducts,
  getTopCustomers,
  getTopSoldProducts,
  getTopCustomersByProfit,
};
