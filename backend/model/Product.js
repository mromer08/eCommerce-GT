const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "hola",
  },
  price: {
    type: Number,
    required: true,
  },
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tag",
    },
  ],
  amount: {
    type: Number,
    default: 1,
  },
  status: {
    type: String,
    enum: ["accepted", "rejected", "inReview"],
    default: "inReview",
  },
});

module.exports = mongoose.model("Product", productSchema);
