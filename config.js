const mongoose = require("mongoose");
const connect = mongoose.connect(
  "mongodb+srv://rudrakshnile930:nilerudra064@lenden.vhsvsdt.mongodb.net/sign-up"
);

//checking database connected or not
connect
  .then(() => {
    console.log("Database connected");
  })
  .catch(() => {
    console.log("Database not Connected");
  });

//creating Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
});

//collection part
const collection = mongoose.model("User", userSchema);

module.exports = collection;
