const express = require("express");
const router = express.Router();
const Stock = require("../models/stock");
const authorizedUser = require("../middleware/auth").authorizedUser;

router.get("/view/:id", async (req, res) => {
  const { id } = req.params;
  const foundItem = await Stock.find({ No_ : id });
  res.json(foundItem);
});

router.get("/view", authorizedUser, async (req, res) => {
  const foundItem = await Stock.find({});
  const itemsArr = [];
  for (item of foundItem) {
    const itemArr = [
      item.Description,
      Math.trunc(item.UnitPrice),
      Math.trunc(item.CMB247),
      Math.trunc(item.STORESCMB),
      Math.trunc(item.KDY),
      Math.trunc(item.KUG),
      Math.trunc(item.ANP),
      Math.trunc(item.CMB281),
      Math.trunc(item.NEG),
      Math.trunc(item.MTR),
      Math.trunc(item.BAT),
      Math.trunc(item.STOCMB12),
      Math.trunc(item.HO),
      Math.trunc(item.STORES),
      item.Application,
    ];
    itemsArr.push(itemArr);
  }
  res.render("../views/items/item2", { items: itemsArr });
});

// router.get("/view2", authorizedUser, async (req, res) => {
//   const foundItem = await Stock.find({});
//   req.session.stockData = foundItem;
//   res.render("../views/items/item", { items: foundItem });
// });

module.exports = router;
