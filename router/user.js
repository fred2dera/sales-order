const User = require("../models/user");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const notUser = require("../middleware/auth").notUser;
const passport = require("passport");

router.get("/new", notUser, (req, res) => {
  res.render("../views/user/new");
});

router.post("/new", notUser, (req, res) => {
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    (err, account) => {
      if (err) {
        console.log(err);
        req.flash("fail", "User Create Failed!")
        return res.render("../views/user/new", { account: account, message:req.flash("fail") });
      }
      passport.authenticate("local")(req, res, () => {
        req.flash("success","Successfully Logged In!");
        res.redirect("/");
      });
    }
  );
});

router.get("/login", notUser, async (req, res) => {
  res.render("../views/user/login");
});

router.post(
  "/login",
  notUser,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/user/login",
  })
);

router.get("/logout", async (req, res) => {
  req.user = null;
  req.session.destroy();
  res.redirect("/");
});

// router.post("/new", notUser, async (req, res) => {
//   const { username, password } = req.body;
//   const foundUser = await User.findOne({ username: username });
//   if (!foundUser) {
//     const hashPassword = await bcrypt.hash(password, 12);
//     const newUser = new User({ username: username, password: hashPassword });
//     req.session.user_id = newUser._id;
//     newUser.save();
//     res.redirect("/");
//   } else {
//     console.log(foundUser);
//     res.redirect("/user/login");
//   }
// });

// router.post("/login", notUser, async (req, res) => {
//   const { username, password } = req.body;
//   const findUser = await User.findOne({ username: username });
//   console.log(findUser);
//   if (findUser) {
//     const comparePassword = await bcrypt.compare(password, findUser.password);
//     if (comparePassword) {
//       req.session.user_id = findUser._id;
//       res.redirect("/");
//     } else {
//       res.redirect("/user/login");
//     }
//   } else {
//     res.redirect("/user/login");
//   }
// });

module.exports = router;
