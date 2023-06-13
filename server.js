const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const knex = require("knex");
const bcrypt = require("bcrypt");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

require("dotenv").config();

const postgresDB = knex({
  client: process.env.CLIENT,
  connection: {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  },
});

const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Success");
});
app.post("/register", (req, res) => {
  register.handleRegister(req, res, postgresDB, bcrypt);
});
app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, postgresDB, bcrypt);
});
app.get("/profile/:id", (req, res) => {
  profile.handleProfile(req, res, postgresDB);
});
app.put("/image", (req, res) => {
  image.handleImage(req, res, postgresDB);
});
app.post("/imageurl", (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
