const Category = require("../model/Category");

const getAllCategories = async (req, res) => {
  const categories = await Category.find();
  if (!categories) return res.status(204).json({ message: "No categories found" });
  res.json(categories);
};

const createNewCategory = async (req, res) => {
  if (
    !req?.body?.name
  ) {
    return res
      .status(400)
      .json({ message: "Name, description, price and categories are required" });
  }

  try {
    const { name, description, price, categories, amount = 1 } = req.body;
    const image = req?.file?.filename || "none.png";
    const result = await Product.create({
      name,
      description,
      price,
      categories,
      amount,
      image: `images/${image}`,
      user: req.userId,
    });

    res.status(201).json(result);
  } catch (err) {
    console.error(err);
  }
};

module.exports = { getAllCategories, createNewCategory };
