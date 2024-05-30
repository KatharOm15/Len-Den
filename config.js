const mongoose = require("mongoose");
const co=require("dotenv").config();
const db=process.env.db;

const connect = mongoose.connect(
`${db}`
);

//checking database connected or not
connect
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {

    console.log("Database not Connected",err);
  });
//creating Schema
const userSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  email: String,
  password: String,
  role: String,
});

const propertySchema = new mongoose.Schema({
  broker: String,
  propertyName: String,
  propertyArea: String,
  propertyPrice: String,
  address: String,
  propertyType: String,
  state: String,
  city: String,
  propertyDescription: String,
  filepath: String,
});

// collection part
const user_collection = mongoose.model("User", userSchema);
const property_collection = mongoose.model("PropertyInfo", propertySchema);

module.exports = { user_collection, property_collection };
