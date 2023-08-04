const Order = require("../models/orderModel");
const { sendEmail, sendOrderMessages } = require("../emails/account");

const createOrder = async (req, res) => {
  const order = new Order({
    ...req.body,
    orderedBy: req.user._id,
  });
  sendOrderMessages(order, req.user);
  try {
    await order.save();
    setTimeout(() => {
      res.status(201).send();
    }, 2000);
  } catch (error) {
    res.status(500).send({ error });
  }
};

module.exports = createOrder;
