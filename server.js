const express = require("express");
const session = require("express-session");
const path = require("path");
const bodyParser = require("body-parser");
const { user_collection, property_collection } = require("./config");
const multer = require("multer");
const { it } = require("node:test");
const { log } = require("console");
const { LOADIPHLPAPI } = require("dns");
const nodemailer = require('nodemailer');


const app = express();

// Session middleware setup
app.use(
  session({
    secret: "secret key",
    resave: false,
    saveUninitialized: true,
    cookie: { isAuthenticated: false },
  })
);
app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.post("/sign-up.html", async (req, res) => {
  const data = {
    name: req.body.name,
    mobile: req.body.number,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
  };

  const existingUser = await user_collection.findOne({ email: data.email });

  if (existingUser) {
    res.send("User Already Exists. Please choose a different email address.");
  } else {
    await user_collection.create(data);
    req.session.isAuthenticated = true;
    if (data.role == "user") {
      res.redirect("/index.html");
    } else {
      res.redirect("/admin.html");
    }
  }
});

app.post("/sign-in.html", async (req, res) => {
  const data = {
    email: req.body.username,
    password: req.body.password,
  };

  const userExists = await user_collection.findOne({
    email: data.email,
    password: data.password,
  });

  if (userExists) {
    const role = userExists.role;
    req.session.isAuthenticated = true;
    req.session.username = data.email;
    if (role == "user") {
      res.redirect("/index.html");
    } else {
      res.redirect("/admin.html");
    }
  } else {
    res.send("User does not exist!!");
  }
});

app.get("/index.html", async (req, res) => {
  const isAuthenticated = req.session.isAuthenticated || false;

  if (isAuthenticated) {
    console.log("hello bro");
    data = await property_collections.find({
      address:
        "Flat No.02, Plot No.41, Gut No. 137, Samarth Residency, Beed By Pass, Aurangabad",
    });
    console.log(data);

    res.sendFile(path.join(__dirname, "index.html"));
  } else {
    res.redirect("/sign-in.html");
  }
});

app.get("/index.html", ensureAuthenticated, (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/admin.html", ensureAuthenticated, (req, res) => {
  res.sendFile(__dirname + "/admin.html");
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

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

app.post("/addProperty", upload.single("propertyImg"), async (req, res) => {
  if (req.session.isAuthenticated) {
    // Fetch username from session
    const username = req.session.username;

    const data = {
      broker: username,
      propertyName: req.body.propertyName,
      propertyArea: req.body.propertyArea,
      propertyPrice: req.body.price,
      address: req.body.address,
      propertyType:
        req.body.propertyType.charAt(0).toUpperCase() +
        req.body.propertyType.substr(1).toLowerCase(),
      state: req.body.propertyState,
      city: req.body.city,
      propertyDescription: req.body.description || "",
      filepath: req.file.path || "",
    };

    console.log(req.body.propertyState);

    await property_collection
      .create(data)
      .then(() => {
        console.log("Data sorted");
      })
      .catch((error) => {
        console.log(error);
      });

    res.redirect("/admin.html");
  } else {
    res.status(401).send("Unauthorized");
  }
});

app.get("/api/items", async (req, res) => {
  try {
    const propertyType = req.query.propertyType;
    const limit = parseInt(req.query.limit) || 10;
    const query = propertyType ? { propertyType } : {};
    const items = await property_collection.find(query).limit(limit).exec();
    //console.log("Items retrieved from DB:", items);
    res.json(items);
  } catch (err) {
    console.error("Error occurred:", err);
    res.status(500).json({ message: err.message });
  }
});

// Middleware to protect routes
function ensureAuthenticated(req, res, next) {
  if (req.session.isAuthenticated) {
    return next();
  } else {
    res.redirect("/sign-in.html");
  }
}

//end

const port = 3000;
app.listen(port, () => {
  console.log("Server Started on port", port);
});
