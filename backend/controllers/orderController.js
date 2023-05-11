const Order = require("../model/Order");
const User = require("../model/User");

const getAllOrders = async (req, res) => {
  const orders = await Order.find({isComplete:false})
    .populate("user", {
      firstname: 1,
      lastname: 1,
    })
    .populate({
      path: "sale",
      select: "total products.quantity",
      populate: {
        path: "products.product",
        select: "name image",
      },
    });

  if (!orders) return res.status(204).json({ message: "No orders found" });
  res.json(orders);
};

const updateOrder = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "ID parameter is required." });
  }
  const order = await Order.findById(req.body.id).exec();
  if (!order) {
    return res
      .status(204)
      .json({ message: `No order matches ID ${req.body.id}.` });
  }
  try {
    if (req.body?.deliveryETA) order.deliveryETA = req.body.deliveryETA;
    if (req.body?.isComplete) order.isComplete = req.body.isComplete;
    const result = await order.save();
    res.json(result);
  } catch (error) {
    console.error(error);
  }
};

const getOrdersByUser = async (req, res) => {
  // all the credit cards by a user
  const user = await User.exists({ username: req.user });
  const orders = await Order.find({ user: user })
    .populate("user", {
      firstname: 1,
      lastname: 1,
    })
    .populate({
      path: "sale",
      select: "total products.quantity",
      populate: {
        path: "products.product",
        select: "name image",
      },
    });
  if (!orders) return res.status(204).json({ message: "No credit card found" });
  res.json(orders);
};
module.exports = { getAllOrders, updateOrder, getOrdersByUser };
