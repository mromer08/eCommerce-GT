const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  sale: {
    type: Schema.Types.ObjectId,
    ref: "Sale",
    required: true,
  },
  isComplete: Boolean,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  deliveryETA: {
    type: Date,
    default: () => new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
  },
});

module.exports = mongoose.model("Order", orderSchema);
