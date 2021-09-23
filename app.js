const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const syncRoute = require("./router/sync");
const stockRoute = require("./router/stock");
const stock = require("./models/stock");

mongoose
  .connect("mongodb://localhost:27017/stocksync")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((e) => {
    console.log(e);
  });

dotenv.config();
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  res.render("home");
});

app.use("/sync", syncRoute);
app.use("/stock", stockRoute);

app.listen(process.env.PORT, () => {
  console.log("Listening on Port 3000........");
});
