const express = require("express");
const router = express.Router();
const { Sequelize } = require("sequelize");
const Stock = require("../models/stock");
const authorizedUser = require("../middleware/auth").authorizedUser;

router.get("/stock", authorizedUser,async (req, res) => {
  const sequelize = new Sequelize(
    process.env.SQL_DB,
    process.env.SQL_USER,
    process.env.SQL_PASS,
    {
      host: process.env.SQL_HOST,
      dialect: "mssql",
      port: 1435,
    }
  );
  try {
    await sequelize.authenticate();
    console.log("Connection to SQL Server is successful.");
    const data = await sequelize.query(
      "SELECT * FROM (SELECT No_, [Dee & Dee Lanka (Pvt) Ltd$Item].Description , [Dee & Dee Lanka (Pvt) Ltd$Item].[Search Description], [Dee & Dee Lanka (Pvt) Ltd$Item].[Product Group Code], [Unit Price], [Application Print Option], [Location Code], [Remaining Quantity],[Gen_ Prod_ Posting Group]  FROM [Dee & Dee Lanka (Pvt) Ltd$Item] LEFT JOIN [Dee & Dee Lanka (Pvt) Ltd$Item Ledger Entry] ON No_ = [Item No_] ) as s PIVOT  ( SUM([Remaining Quantity]) FOR [Location Code] IN (CMB247, [STORES CMB],KDY, KUG, ANP, CMB281, NEG, MTR, BAT, [STO CMB12],HO, STORES)	) as pvt ORDER BY [Gen_ Prod_ Posting Group], [Description]"
    );
    await Stock.deleteMany({});
    for (item of data[0]) {
      const newItem = await new Stock({
        No_: item.No_,
        Description: item.Description,
        SearchDescription: item['Search Description'],
        ProductGroupCode: item['Product Group Code'],
        UnitPrice: item['Unit Price'],
        Application: item['Application Print Option'],
        Group: item['Gen_ Prod_ Posting Group'],
        CMB247: item.CMB247,
        STORESCMB: item['STORES CMB'],
        KDY: item.KDY,
        KUG: item.KUG,
        ANP: item.ANP,
        CMB281: item.CMB281,
        NEG: item.NEG,
        MTR: item.MTR,
        BAT: item.BAT,
        STOCMB12: item['STO CMB12'],
        HO: item.HO,
        STORES: item.STORES,
      });
      await newItem.save();
    }
    res.redirect('/stock/view');
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});



router.get("/customer",async (req,res)=>{
  const sequelize = new Sequelize(
    process.env.SQL_DB,
    process.env.SQL_USER,
    process.env.SQL_PASS,
    {
      host: process.env.SQL_HOST,
      dialect: "mssql",
      port: 1435,
    }
  );
  try {
    await sequelize.authenticate();
    console.log("Connection to SQL Server is successful.");
    const data = await sequelize.query(
      "SELECT No_,Name,[Name 2],Address,[Address 2],City,[Phone No_],[Territory Code],[Chain Name],[Payment Terms Code],[Salesperson Code] FROM [Dee & Dee Lanka (Pvt) Ltd$Customer]"
      );
    console.log(data);
    // for (item of data[0]) {
    //   const newItem = await new Stock({
    //     No_: item.No_,
    //     Description: item.Description,
    //     SearchDescription: item['Search Description'],
    //     ProductGroupCode: item['Product Group Code'],
    //     UnitPrice: item['Unit Price'],
    //     Application: item['Application Print Option'],
    //     Group: item['Gen_ Prod_ Posting Group'],
    //     CMB247: item.CMB247,
    //     STORESCMB: item['STORES CMB'],
    //     KDY: item.KDY,
    //     KUG: item.KUG,
    //     ANP: item.ANP,
    //     CMB281: item.CMB281,
    //     NEG: item.NEG,
    //     MTR: item.MTR,
    //     BAT: item.BAT,
    //     STOCMB12: item['STO CMB12'],
    //     HO: item.HO,
    //     STORES: item.STORES,
    //   });
    //   await newItem.save();
    // }
    res.redirect('/item/view');
  } catch (err) {
    console.log(err);
    res.send(err);
  }

})



router.get("/cusledger",async (req,res)=>{
  const sequelize = new Sequelize(
    process.env.SQL_DB,
    process.env.SQL_USER,
    process.env.SQL_PASS,
    {
      host: process.env.SQL_HOST,
      dialect: "mssql",
      port: 1435,
    }
  );
  try {
    await sequelize.authenticate();
    console.log("Connection to SQL Server is successful.");
    const data = await sequelize.query(
      "SELECT [Posting Date],[Customer No_],Name,[Document No_],SUM( [Dee & Dee Lanka (Pvt) Ltd$Detailed Cust_ Ledg_ Entry].[Debit Amount (LCY)] - [Dee & Dee Lanka (Pvt) Ltd$Detailed Cust_ Ledg_ Entry].[Credit Amount (LCY)]) AS BALANCE FROM [Dee & Dee Lanka (Pvt) Ltd$Detailed Cust_ Ledg_ Entry] LEFT JOIN [Dee & Dee Lanka (Pvt) Ltd$Customer] ON [Dee & Dee Lanka (Pvt) Ltd$Detailed Cust_ Ledg_ Entry].[Customer No_] = [Dee & Dee Lanka (Pvt) Ltd$Customer].No_ WHERE ([Dee & Dee Lanka (Pvt) Ltd$Detailed Cust_ Ledg_ Entry].[Debit Amount (LCY)] - [Dee & Dee Lanka (Pvt) Ltd$Detailed Cust_ Ledg_ Entry].[Credit Amount (LCY)]) <> 0.00000 GROUP BY [Dee & Dee Lanka (Pvt) Ltd$Detailed Cust_ Ledg_ Entry].[Customer No_],[Dee & Dee Lanka (Pvt) Ltd$Customer].Name,[Dee & Dee Lanka (Pvt) Ltd$Detailed Cust_ Ledg_ Entry].[Document No_],[Dee & Dee Lanka (Pvt) Ltd$Detailed Cust_ Ledg_ Entry].[Posting Date] ORDER BY [Dee & Dee Lanka (Pvt) Ltd$Detailed Cust_ Ledg_ Entry].[Customer No_]"
      );
    console.log(data);
    // for (item of data[0]) {
    //   const newItem = await new Stock({
    //     No_: item.No_,
    //     Description: item.Description,
    //     SearchDescription: item['Search Description'],
    //     ProductGroupCode: item['Product Group Code'],
    //     UnitPrice: item['Unit Price'],
    //     Application: item['Application Print Option'],
    //     Group: item['Gen_ Prod_ Posting Group'],
    //     CMB247: item.CMB247,
    //     STORESCMB: item['STORES CMB'],
    //     KDY: item.KDY,
    //     KUG: item.KUG,
    //     ANP: item.ANP,
    //     CMB281: item.CMB281,
    //     NEG: item.NEG,
    //     MTR: item.MTR,
    //     BAT: item.BAT,
    //     STOCMB12: item['STO CMB12'],
    //     HO: item.HO,
    //     STORES: item.STORES,
    //   });
    //   await newItem.save();
    // }
    res.redirect('/stock');
  } catch (err) {
    console.log(err);
    res.send(err);
  }

})

module.exports = router;
