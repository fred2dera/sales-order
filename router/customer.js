const express = require("express");
const router = express.Router();
const authorizedUser = require("../middleware/auth").authorizedUser;
const axios = require("axios");

router.get("/list", authorizedUser, async (req, res) => {
  axios
    .get("http://124.43.12.247:7048/DynamicsNAV70/OData/CustomerLedger", {
      withCredentials: true,
      auth: {
        username: "ashan",
        password: "P@ssw0rd",
      },
    })
    .then((response) => {
      const cusData = response.data.d.results;
      const customersData = [];
      for (customer of cusData) {
        const customerData = [
          customer.No,
          customer.Name,
          customer.Address,
          customer.Address_2,
          customer.Salesperson_Code,
          customer.Phone_No,
          `<a href="/orders/${customer.No}">Sales Order</a>`,
          `<a href="/customer/ledger/${customer.No}">Ledger</a>`,
        ];
        customersData.push(customerData);
      }
      res.render("../views/customer/list", { customers: customersData });
    })
    .catch((error) => {
      res.send(`There was an error in connecting to the server ${error}`);
    });
});

router.get("/ledger/:id", authorizedUser, async (req, res) => {
  const { id } = req.params;
  axios
    .get(
      `http://124.43.12.247:7048/DynamicsNAV70/OData/CusOut?$filter=Customer_No eq '${id}'`,
      {
        withCredentials: true,
        auth: {
          username: "ashan",
          password: "P@ssw0rd",
        },
      }
    )
    .then((response) => {
      const cusData = response.data.d.results;
      console.log(cusData);
      res.render("../views/customer/ledger", { entries: cusData });
    })
    .catch((error) => {
      console.log(error);
      res.send(`There was an error in connecting to the server ${error}`);
    });
});

module.exports = router;
