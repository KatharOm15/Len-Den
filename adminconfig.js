const mongoose = require("mongoose");
// const connect = mongoose.connect(
//   "mongodb+srv://rudrakshnile930:nilerudra064@lenden.vhsvsdt.mongodb.net/adminProperty"
// );

//checking database connected or not
// Disconnect from the current database
mongoose.disconnect().then(() => {
    // Connect to a different database
    return mongoose.connect("mongodb+srv://rudrakshnile930:nilerudra064@lenden.vhsvsdt.mongodb.net/adminProperty");
}).then(() => {
    console.log('Connected to new database');
}).catch((error) => {
    console.error('Error connecting to new database:', error);
});

  const adminScheme= new mongoose.Schema({
    propname: String,
    location:String,
    imgname: String,
    buffer: Buffer
    
  });
  

  


  const collection1 = mongoose.model("adminCollection", adminScheme);

  module.exports = collection1;


  
