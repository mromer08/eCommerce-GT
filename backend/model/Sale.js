const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const saleSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  total: Number,
  date: {
    type: Date,
    default: Date.now(),
  },
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: Number,
    },
  ],
  order: {
    type: Schema.Types.ObjectId,
    ref: "Order",
  },
});

module.exports = mongoose.model("Sale", saleSchema);
