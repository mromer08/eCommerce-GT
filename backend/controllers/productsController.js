const Product = require("../model/Product");
const User = require("../model/User");
const path = require("path");
const ROLES_LIST = require("../config/roles_list");
const { unlink } = require("fs-extra");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({  })
      .populate("user", {
        firstname: 1,
        lastname: 1,
        username: 1,
      })
      .populate("category", {
        name: 1,
      });
    if (!products)
      return res.status(204).json({ message: "No products found" });
    res.json(products);
  } catch (error) {
    console.log(error);
  }
};

const getProductsByUser = async (req, res) => {
  if (!req?.params?.username)
    return res.status(400).json({ message: "User is required" });
  try {
    const user = await User.findOne({ username: req.params.username }).exec();
    const products =
      user &&
      (await Product.find({ user: user._id })
        .populate("user", {
          firstname: 1,
          lastname: 1,
          username: 1,
        })
        .populate("category", {
          name: 1,
        }));
    if (!products)
      return res.status(204).json({ message: "No products found" });
    res.json(products);
  } catch (error) {
    console.log(error);
  }
};

const createNewProduct = async (req, res) => {
  console.log(req.file)
  if (
    !req?.body?.name ||
    !req?.body?.description ||
    !req?.body?.price ||
    !req?.body?.category
  ) {
    return res.status(400).json({
      message: "Name, description, price and category are required",
    });
  }

  try {
    const { name, description, price, category, amount = 1 } = req.body;
    const image = req?.file?.filename || "none.png";
    const result = await Product.create({
      name,
      description,
      price,
      category,
      amount,
      image: `/images/${image}`,
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
  if (
    !req.roles.includes(ROLES_LIST.Delivery) &&
    product.user.toString() !== req.userId.toString()
  ) {
    return res
      .status(401)
      .json({ message: `You cannot update someone else's product` });
  }
  try {
    if (req.body?.name) product.name = req.body.name;
    if (req.body?.description) product.description = req.body.description;
    if (req.body?.price) product.price = req.body.price;
    if (req.body?.category) product.category = req.body.category;
    if (req.body?.amount) product.amount = req.body.amount;
    if (req.body?.status && /accepted|rejected|inReview/.test(req.body?.status))
      product.status = req.body.status;
    if (req.file?.filename) {
      if (product.image !== "/images/none.png") {
        await unlink(path.resolve("./public" + product.image));
      }
      product.image = `images/${req.file.filename}`;
    }
    const result = await product.save();
    res.json(result);
  } catch (error) {
    console.error(error);
  }
};

const deleteProduct = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "Product ID required." });

  try {
    const product = await Product.findOne({ _id: req.body.id }).exec();
    if (!product) {
      return res
        .status(204)
        .json({ message: `No product matches ID ${req.body.id}.` });
    }
    if (
      !req.roles.includes(ROLES_LIST.Admin) &&
      product.user.toString() !== req.userId.toString()
    ) {
      return res
        .status(401)
        .json({ message: `You cannot delete someone else's product` });
    }
    if (product.image !== "/images/none.png") {
      await unlink(path.resolve("./public" + product.image));
    }
    const result = await product.deleteOne();
    res.json(result);
  } catch (error) {
    console.log(error);
  }
};

const getProduct = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "Product ID required" });
  try {
    const product = await Product.findById(req.params.id)
      .populate("user", {
        firstname: 1,
        lastname: 1,
        username: 1,
      })
      .populate("category", {
        name: 1,
      });
    if (!product) {
      return res
        .status(204)
        .json({ message: `Product ID ${req.params.id} not found` });
    }
    res.json(product);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllProducts,
  createNewProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getProductsByUser,
};
