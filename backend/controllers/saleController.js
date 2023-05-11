const Sale = require("../model/Sale");
const CreditCard = require("../model/CreditCard");
const ROLES_LIST = require("../config/roles_list");
const Order = require("../model/Order");
const Product = require("../model/Product");

const getAllSales = async (req, res) => {
  try {
    const sales = await Sale.find({})
      .populate("user", {
        firstname: 1,
        lastname: 1
      })
      .populate({
        path: "products.product",
        select: "name description price amount",
      })
      .populate("order");
    if (!sales) return res.status(204).json({ message: "No sales found" });
    res.json(sales);
  } catch (error) {
    console.log(error);
  }
};

const createNewSale = async (req, res) => {
  console.log(req.file);
  if (!req?.body?.total || !req?.body?.products || !req?.body?.card) {
    return res.status(400).json({
      message: "Total, date and products are required",
    });
  }

  try {
    const card = CreditCard.findOne({
      _id: req.body.card,
      user: req.userId,
    }).exec();
    if (!card)
      return res
        .status(401)
        .json({ message: "That credit card doesnt exist for the user" });
    const { total, products } = req.body;

    const quantitiesValid = await Promise.all(
      products.map(async (item) => {
        const currProduct = await Product.findById(item.product);
        return item.quantity <= currProduct.amount;
      })
    );

    if (!quantitiesValid.every((valid) => valid)) {
      return res.status(400).json({
        message: "One or more quantities exceed the product amount",
      });
    }

    for (const item of products) {
      const currProduct = await Product.findById(item.product);
      currProduct.amount -= item.quantity;
      await currProduct.save();
    }

    const newSale = await Sale.create({
      total,
      products,
      user: req.userId,
    });
    const newOrder = await Order.create({
      user: req.userId,
      sale: newSale._id,
    });
    newSale.order = newOrder._id;
    const result = await newSale.save();

    res.status(201).json(result);
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getAllSales,
  createNewSale,
};
