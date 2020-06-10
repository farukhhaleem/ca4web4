const express = require("express"),
  router = express.Router(),
  HomeController = require("../controllers/home");

const { renderHome, renderRegister, renderLogin, registerUser, loginUser } = HomeController;

router.get("/", renderHome);
router.get("/register", renderRegister);
router.get("/login", renderLogin);

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
