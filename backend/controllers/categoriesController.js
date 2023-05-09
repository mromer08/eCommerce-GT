const Category = require("../model/Category");

const getAllCategories = async (req, res) => {
  const categories = await Category.find();
  if (!categories)
    return res.status(204).json({ message: "No categories found" });
  res.json(categories);
};

const createNewCategory = async (req, res) => {
  if (!req?.body?.name) {
    return res.status(400).json({ message: "Name is required" });
  }

  const duplicate = await Category.exists({name: req.body.name}).exec();
  if(duplicate) return res.sendStatus(409);

  try {
    const { name } = req.body;
    const result = await Category.create({
      name,
    });

    res.status(201).json(result);
  } catch (err) {
    console.error(err);
  }
};

module.exports = { getAllCategories, createNewCategory };
