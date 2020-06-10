const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
mongoose.set("useCreateIndex", true);

mongoose.connect("mongodb+srv://farukh:farukh@cluster0-shcsw.mongodb.net/test", err => {
  // console.log(err);
  if (!err) {
    console.log("MongoDB connection successfull.....");
  } else {
    console.log("Error in DB connection : " + JSON.stringify(err, undefined, 2));
  }
});

module.exports = mongoose;
