const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    product: Schema.Types.ObjectId,
    
});

module.exports = mongoose.model("Cart", cartSchema);
