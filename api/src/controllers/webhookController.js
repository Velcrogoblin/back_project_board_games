const mercadopago = require("mercadopago");

const receiveWebhook = async (req, res) => {
  try {
    const response = await mercadopago.payment.findById(req.query);
    console.log(response);
    return res.status(200).json({ message: "Receive payment" });
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
};

module.exports = {
  receiveWebhook,
};
