require("dotenv").config();
const express = require("express");
const app = express();
var cors = require("cors");
var bodyParser = require("body-parser");
const passport = require("passport");
const auth = require("./api/auth");
const user = require("./api/users");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());

app.use("/auth", auth);
app.use("/api", user);

const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Server is running on port ${port}`));
