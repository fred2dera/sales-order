const express = require("express");
const router = express.Router();
const Stock = require("../models/stock");

router.get("/", async (req, res) => {
  const foundItem = await Stock.find({});
  console.log(foundItem);
  res.json(foundItem);
});

router.get("/view", async (req, res) => {
  const foundItem = await Stock.find({});
  res.render("../views/item", { items: foundItem });
});

module.exports = router;
