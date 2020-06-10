const express = require("express"),
  router = express.Router(),
  ProductController = require("../controllers/product");

const { getProductByID, getAllProducts } = ProductController;

router.post("/products", getAllProducts);
// router.get("/")
router.get("/:id", getProductByID);
// router.delete("/products/:id");

module.exports = router;
