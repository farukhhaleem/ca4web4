const ObjectId = require("mongoose").Types.ObjectId,
  Product = require("../models/product"),
  ProductController = {};

ProductController.getProductByID = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send(`No record with given id : ${req.params.id}`);
  }
  try {
    console.log("Retreiving product");
    const product = await Product.findById(req.params.id);
    return res.render("front/product", { data: product });
  } catch (err) {
    console.log("Error in retreiving product detail");
  }
  //   Product.findById(req.params.id, (err, docs) => {
  //     if (!err) {
  //       return res.render("front/product", { data: docs });
  //     } else {
  //     }
  //   });
};

ProductController.getAllProducts = async (req, res) => {
  try {
    const docs = await Product.find();
    res.send(docs);
  } catch (err) {
    console.log("Error in retrieving products " + JSON.stringify(err, undefined, 2));
  }
};

module.exports = ProductController;
