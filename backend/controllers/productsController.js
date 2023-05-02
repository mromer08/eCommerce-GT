const Product = require("../model/Product");
const path = require('path');
const { unlink } = require("fs-extra");

const getAllProducts = async (req, res) => {
  const products = await Product.find();
  if (!products) return res.status(204).json({ message: "No products found" });
  res.json(products);
};

const getProductsByUser = async (req, res) => {
  if (!req?.body?.user)
    return res
      .status(400)
      .json({ message: "User is required" });
  const products = await Product.find({ user });
  if (!products) return res.status(204).json({ message: "No products found" });
  res.json(products);
};

const createNewProduct = async (req, res) => {
  if (
    !req?.body?.name ||
    !req?.body?.description ||
    !req?.body?.price ||
    !req?.body?.tags
  ) {
    return res
      .status(400)
      .json({ message: "Name, description, price and tags are required" });
  }

  try {
    const { name, description, price, tags, amount = 1 } = req.body;
    const image = req?.file?.filename || "none.png";
    const result = await Product.create({
      name,
      description,
      price,
      tags,
      amount,
      image: `images/${image}`,
      user: req.userId,
    });

    res.status(201).json(result);
  } catch (err) {
    console.error(err);
  }
};

const updateProduct = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "ID parameter is required." });
  }
  const product = await Product.findOne({ _id: req.body.id }).exec();
  if (!product) {
    return res
      .status(204)
      .json({ message: `No product matches ID ${req.body.id}.` });
  }
  if (product.user !== req.userId) {
    return res
      .status(401)
      .json({ message: `You cannot update someone else's product` });
  }
  try {
    if (req.body?.name) product.name = req.body.name;
    if (req.body?.description) product.description = req.body.description;
    if (req.body?.price) product.price = req.body.price;
    if (req.body?.tags) product.tags = req.body.tags;
    if (req.body?.amount) product.amount = req.body.amount;
    if (req.body?.status && /accepted|rejected|inReview/.test(req.body?.status))
    product.status = req.body.status;
    if (req.file?.filename) {
      await unlink(path.resolve('./src/public' + product.image));
      product.image = `images/${req.file.filename}`;
    };
    const result = await product.save();
    res.json(result);
  } catch (error) {
    console.error(error);
  }
};

const deleteProduct = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "Product ID required." });

  const product = await Product.findOne({ _id: req.body.id }).exec();
  if (!product) {
    return res
      .status(204)
      .json({ message: `No product matches ID ${req.body.id}.` });
  }
  if (product.user !== req.userId) {
    return res
      .status(401)
      .json({ message: `You cannot delete someone else's product` });
  }
  await unlink(path.resolve('./src/public' + product.image));
  const result = await product.deleteOne();
  res.json(result);
};

const getProduct = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "Product ID required" });
  const product = await Product.findOne({ _id: req.params.id }).exec();
  if (!product) {
    return res
      .status(204)
      .json({ message: `Product ID ${req.params.id} not found` });
  }
  res.json(product);
};

module.exports = {
  getAllProducts,
  createNewProduct,
  updateProduct,
  deleteProduct,
  getProduct,
};
