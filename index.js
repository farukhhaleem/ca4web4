const express = require("express"),
  bodyParser = require("body-parser"),
  session = require("express-session"),
  path = require("path"),
  passport = require("passport"),
  app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
// app.use(express.static(__dirname));
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use(
  session({
    secret: "cookie_secret",
    resave: true,
    saveUninitialized: true,
  }),
);

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//call middlewares
app.use(require("./middlewares/passport"));
app.use(require("./middlewares/loadUser"));

//routes
app.use("/", require("./routes/home"));
app.use("/product", require("./routes/product"));
app.use("/cart", require("./routes/cart"));

//server init
app.listen(3000, () => console.log("server running at: http://localhost:3000"));
