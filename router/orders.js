const express = require("express");
const router = express.Router();
const axios = require("axios");
const Stock = require("../models/stock");
const Order = require("../models/order");
const ejs = require("ejs");
const sendMail = require("../middleware/mail").sendMail;
const authorizedUser = require("../middleware/auth").authorizedUser;

router.get("/new", async (req, res) => {
  axios
    .get("http://124.43.12.247:7048/DynamicsNAV70/OData/CustomerLedger", {
      withCredentials: true,
      auth: {
        username: "ashan",
        password: "P@ssw0rd",
      },
    })
    .then(async (response) => {
      const foundItem = await Stock.find({});
      let findOrderNo = await Order.findOne({}).sort("-No");
      if (!findOrderNo) {
        foundOrderNo = 0;
      } else {
        foundOrderNo = findOrderNo.No;
      }
      const cusData = response.data.d.results;
      res.render("../views/orders/new", {
        customers: cusData,
        items: foundItem,
        orderNo: foundOrderNo,
      });
    })
    .catch((error) => {
      res.send(`There was an error in connecting to the server ${error}`);
    });
});

router.post("/new", async (req, res) => {
  const {
    No,
    Customer,
    Date,
    Terms,
    Discount,
    Remarks,
    Method,
    Salesperson,
    Description,
    Quantity,
    UnitPrice,
  } = req.body;

  const itemData = [];
  for (let i = 0; i < Description.length; i++) {
    itemData.push({
      Description: Description[i],
      Quantity: Quantity[i],
      UnitPrice: UnitPrice[i],
    });
  }
  const newOrder = new Order({
    No: No,
    Customer: Customer,
    Date: Date,
    Terms: Terms,
    Discount: Discount,
    Remarks: Remarks,
    Method: Method,
    Salesperson: Salesperson,
    Item: itemData,
  });
  await newOrder.save();
  ejs.renderFile(
    "./views/email.ejs",
    { order: newOrder },
    async (err, data) => {
      if (err) {
        res.send(`An Error Occurred ! Error: ${err}`);
      } else {
        await sendMail(data);
        res.redirect("/orders/list");
      }
    }
  );
});

router.get("/sendmail/:id", async (req, res) => {
  const { id } = req.params;
  const findOrder = await Order.findById(id);
  ejs.renderFile(
    "./views/email.ejs",
    { order: findOrder },
    async (err, data) => {
      if (err) {
        res.send(`An Error Occurred ! Error: ${err}`);
      } else {
        await sendMail(data);
        res.redirect("/orders/list");
      }
    }
  );
});

router.get("/list", async (req, res) => {
  const foundOrders = await Order.find({});
  res.render("../views/orders/list", { orders: foundOrders });
});

router.get("/view/:id", async (req, res) => {
  res.render("../views/orders/view");
});

router.get("/edit/:id", async (req, res) => {
  const { id } = req.params;
  axios
    .get("http://124.43.12.247:7048/DynamicsNAV70/OData/CustomerLedger", {
      withCredentials: true,
      auth: {
        username: "ashan",
        password: "P@ssw0rd",
      },
    })
    .then(async (cusData) => {
      const foundItem = await Stock.find({});
      const foundOrder = await Order.findOne({ _id: id });
      res.render("../views/orders/edit", {
        order: foundOrder,
        customers: cusData.data.d.results,
        items: foundItem,
      });
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const {
    No,
    Customer,
    Date,
    Terms,
    Discount,
    Remarks,
    Method,
    Salesperson,
    Description,
    Quantity,
    UnitPrice,
  } = req.body;

  const itemData = [];
  for (let i = 0; i < Description.length; i++) {
    itemData.push({
      Description: Description[i],
      Quantity: Quantity[i],
      UnitPrice: UnitPrice[i],
    });
  }
  const updateOrder = await Order.findByIdAndUpdate(id, {
    No: No,
    Customer: Customer,
    Date: Date,
    Terms: Terms,
    Discount: Discount,
    Remarks: Remarks,
    Method: Method,
    Salesperson: Salesperson,
    Item: itemData,
  });
  if (updateOrder) res.redirect("/orders/list");
});

router.get("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const foundOrder = await Order.findOneAndDelete({ _id: id });
  if (foundOrder) {
    res.redirect("/orders/list");
  } else {
    res.send("Failed to Delete this Order!");
  }
});

module.exports = router;
