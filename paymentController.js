require("dotenv").config();
const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

// For token generate
exports.generateToken = async (req, res) => {
  gateway.clientToken
    .generate({})
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => res.status(500).send(err));
};

exports.processPayment = async (req, res) => {
  const nonceFromTheClient = req.body.payment_method_nonce;
  const { amount } = req.body;
  gateway.transaction
    .sale({
      amount: amount,
      paymentMethodNonce: nonceFromTheClient,
      options: {
        submitForSettlement: true,
      },
    })
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
