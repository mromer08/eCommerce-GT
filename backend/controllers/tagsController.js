const Tag = require("../model/Tag");

const getAllTags = async (req, res) => {
  const tags = await Tag.find();
  if (!tags) return res.status(204).json({ message: "No tags found" });
  res.json(tags);
};

module.exports = { getAllTags };
