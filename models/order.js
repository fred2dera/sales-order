const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  No: {
    type: String,
    unique: true,
    required: true,
  },
  Customer: {
    type: String,
    required: true,
  },
  Date: String,
  Terms: String,
  Discount: String,
  Remarks: String,
  Method: String,
  Salesperson: String,
  Item: [{ Description: String, Quantity: Number, UnitPrice: Number }],
});

module.exports = mongoose.model("Order", orderSchema);

