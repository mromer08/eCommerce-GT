const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const creditCardShema = new Schema({
  holderName: {
    type: String,
    required: true,
  },
  lastDigits: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  expirationDate: {
    type: Date,
    required: true,
  },
  cvcCode: {
    type: Date,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

module.exports = mongoose.model("CreditCard", creditCardShema);
