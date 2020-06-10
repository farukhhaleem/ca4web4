const mongoose = require("../db");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = mongoose.Schema(
  {
    name: { type: String },
    username: {
      type: String,
      unique: true,
      validate: {
        validator: function(value) {
          return /^[a-z]+([a-z\d]+){5,}$/gm.test(value);
        },
        message: "Invalid Username. <br>Use lowercase letters and numbers only.<br>Enter at least 6 characters",
      },
    },
    password: { type: String },
    admin: { type: Boolean },
  },
  {
    timestamps: true,
  },
);

UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", UserSchema, "User");

module.exports = User;
