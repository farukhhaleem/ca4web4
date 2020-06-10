const express = require("express"),
  router = express.Router(),
  Product = require("../models/product");

router.get("/add/:id", (req, res) => {
  const id = req.params.id;
  Product.findById(id, (err, docs) => {
    if (!err) {
      let mycart = req.session.cart ? req.session.cart : [];
      const temp = {
        product: docs,
        qty: 1,
      };
      mycart.push(temp);
      req.session.cart = mycart;
      // res.send(req.session.cart);
      let response = {
        msg: "Product has been added to cart.",
        status: true,
        data: req.session.cart,
      };
      res.send(response);
    } else {
      let response = {
        msg: "Invalid product. Please try again.",
        status: false,
        data: [],
      };
      res.send(response);
    }
  });
});

router.get("/", (req, res) => {
  // show all products
  let mycart = req.session.cart;
  if (mycart && mycart != []) {
    return res.render("front/showcartview", { data: mycart });
  } else {
    // return res.redirect('/home/');
    return res.render("front/showcartemptyview", { data: mycart });
  }
});

router.get("/clear", (req, res) => {
  // show all products
  req.session.cart = [];
  return res.redirect("/cart");
});

module.exports = router;
