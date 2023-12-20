const express = require("express");
const cors = require("cors");

const app = express();
const paymentRoute = require("./paymentRoute");

// Routing purpose
app.use(cors());
app.use(express.json());
app.use("/api", paymentRoute);

// Server listen
const port = 5000;
app.listen(port, () => {
  console.log(`App is running at ${port}`);
});
