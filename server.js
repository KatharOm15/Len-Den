const express = require("express");
const session = require("express-session");
const path = require("path");
const bodyParser = require("body-parser");
const collection = require("./config");

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
    res.redirect("/index.html");
  }
});

app.post("/sign-in.html", async (req, res) => {
  const data = {
    email: req.body.username,
    password: req.body.password,
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
app.get("/sign-out", (req, res) => {
  req.session.isAuthenticated = false;

  res.redirect("/index.html");
});

const port = 3000;
app.listen(port, () => {
  console.log("Server Started on port", port);
});
