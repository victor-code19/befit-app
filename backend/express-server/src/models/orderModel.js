const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
  services: [
    {
      id: String,
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
  totalAmount: Number,
  orderedBy: Schema.Types.ObjectId,
});

const Order = model("Order", orderSchema);

module.exports = Order;
