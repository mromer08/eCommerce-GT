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
  tags: {
    tech: Number,
    home: Number,
    academic: Number,
    literature: Number,
    literature: Number,
    decoration: Number,
    others: Number
  },
  amount: {
    type: Number,
    default: 1
  },
  state: {
    accepted: Boolean,
    rejected: Boolean,
    inReview: {
        type: Boolean,
        default: true
    }
  }
});

module.exports = mongoose.model("Product", productSchema);
