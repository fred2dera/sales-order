module.exports.authorizedUser = async (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect("/user/login");
  }
};
module.exports.notUser = (req, res, next) => {
  if (!req.user) {
    next();
  } else {
    res.redirect("/");
  }
};
