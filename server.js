const express = require("express");
const session = require("express-session");
const path = require("path");
const bodyParser = require("body-parser");
const collection = require("./config");
const admincoll=require("./adminconfig");
const multer=require("multer");

const app = express();

// Session middleware setup
app.use(
  session({
    secret: "secret key",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.post("/sign-up.html", async (req, res) => {
  const data = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
  };

  const existingUser = await collection.findOne({ email: data.email });

  if (existingUser) {
    res.send("User Already Exists. Please choose a different email address.");
  } else {
    await collection.insertOne(data);
    req.session.isAuthenticated = true;
    if(data.role=="user")
      {
        res.redirect("/index.html");
      }
      else{
        res.redirect("/admin.html");
      }
  }
});

app.post("/sign-in.html", async (req, res) => {
  const data = {
    email: req.body.username,
    password: req.body.password
  };

  const userExists = await collection.findOne({
    email: data.email,
    password: data.password,
  });

  if (userExists) {
    req.session.isAuthenticated = true;
    res.redirect("/index.html");
  } else {
    res.send("User does not exist!!");
  }
});

app.get("/index.html", (req, res) => {
  const isAuthenticated = req.session.isAuthenticated || false;

  if (isAuthenticated) {
    res.sendFile(path.join(__dirname, "index.html"));
  } else {
    res.redirect("/sign-in.html");
  }
});

//handle Authentication
app.get("/auth-status", (req, res) => {
  const isAuthenticated = req.session.isAuthenticated || false;
  res.json({ isAuthenticated });
});

//handle sign-out
app.post("/sign-out", (req, res) => {
  req.session.isAuthenticated = false;

  res.redirect("/index.html");
});

//uploading image

app.use(express.urlencoded({extended:false}))
const upload=multer({dest:"upload/"})

//adding property
app.post("/listproperty.html",upload.single("inputFile"), async (req,res)=>{
  
  const data = {
    propname: req.body.propname,
    location:req.body.location,
    imgname: req.file.originalname,
    buffer: req.file.filename
  };
  console.log(data);
  const existingUser = await admincoll.findOne({ propname: data.propname });

  if (existingUser) {
    res.send("User Already Exists. Please choose a different email address.");
  } else {
    await admincoll.insertMany(data);
    req.session.isAuthenticated = true;
    res.redirect("/admin.html");
  }
  console.log(req.file);
})


const port = 3000;
app.listen(port, () => {
  console.log("Server Started on port", port);
});
