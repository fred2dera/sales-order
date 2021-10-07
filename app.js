const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const flash = require("connect-flash");

const User = require("./models/user");
const sessionConfig = require("./middleware/config").sessionConfig;
const syncRoute = require("./router/sync");
const itemRoute = require("./router/item");
const userRoute = require("./router/user");
const cusRoute = require("./router/customer");
const orderRoute = require("./router/orders");

mongoose
  .connect("mongodb://localhost:27017/stocksync")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((e) => {
    console.log(e);
  });

dotenv.config();

app.use(express.static("public"));
app.use(session(sessionConfig));
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.set("view engine", "ejs");
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", async (req, res) => {
  res.render("home");
});

app.use("/sync", syncRoute);
app.use("/stock", itemRoute);
app.use("/user", userRoute);
app.use("/customer", cusRoute);
app.use("/orders", orderRoute);

app.listen(process.env.PORT, () => {
  console.log("Listening on Port 3000........");
});
