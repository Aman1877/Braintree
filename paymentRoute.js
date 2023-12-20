const express = require("express");
const { generateToken, processPayment } = require("./paymentController");
const router = express.Router();

// For token (server token send krse)
router.get("/generate/token", generateToken);

// For payment process
router.post("/process/payment", processPayment);

module.exports = router;
