const Product = require("../models/product"),
  User = require("../models/user"),
  passport = require("passport");

const HomeController = {};

HomeController.renderHome = async (req, res) => {
  try {
    const products = await Product.find().limit(6);
    res.render("front/home", { data: products });
  } catch (err) {
    console.log("Error in retrieving products: " + JSON.stringify(err, undefined, 2));
  }
};

HomeController.renderRegister = (req, res, next) => {
  //if user is signed in don't open this page
  if (req.user && req.user != null) {
    return next();
  }
  res.render("front/register");
};

HomeController.renderLogin = (req, res, next) => {
  //if user is signed in don't open this page
  if (req.user && req.user != null) {
    return next();
  }
  res.render("front/login");
};

HomeController.registerUser = async (req, res) => {
  try {
    await User.register(new User({ username: req.body.username, name: req.body.name, admin: 0 }), req.body.password);
    passport.authenticate("local")(req, res, function() {
      res.redirect("/");
    });
  } catch (err) {
    if (err.errors) err = err.errors["username"];
    res.render("front/register", { error: err.message });
  }
};

HomeController.loginUser = async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err || !user) {
      if (err) info = err;
      return res.render("front/login", { error: info.message });
    }
    req.login(user, err => {
      if (err) return res.render("front/login", { error: err.message });
      return res.redirect("/");
    });
  })(req, res, next);
};

module.exports = HomeController;
