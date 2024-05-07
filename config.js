const mongoose = require("mongoose");
const connect = mongoose.connect(
  "mongodb+srv://rudrakshnile930:nilerudra064@lenden.vhsvsdt.mongodb.net/lenden"
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

const adminScheme = new mongoose.Schema({
  propname: String,
  location: String,
  imgname: String,
  buffer: Buffer,
});

//collection part
const user_collection = mongoose.model("User", userSchema);
const admin_collection = mongoose.model("adminCollection", adminScheme);

module.exports = { user_collection, admin_collection };
