const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

require("dotenv").config();

// importing routes
const indexRouter = require("./routes/index");
const accomodationRouter = require("./routes/accomodation.route");
const accomodationTypeRouter = require("./routes/accomodationType.route");
const amenityRouter = require("./routes/amenity.route");

const app = express();

// middlreware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// db connection
const dbName =
  process.env.NODE_ENV === "test"
    ? process.env.dbTesting
    : process.env.NODE_ENV === "production"
    ? process.env.dbProduction
    : process.env.dbDevelopment;

mongoose
  .connect(
    `mongodb+srv://${process.env.connectionString}/${dbName}?retryWrites=true&w=majority&appName=${process.env.appName}`
  )
  .then(() => console.log("Connected to the databse"))
  .catch(() => console.log("Error connecting to the database"));

// routes
app.use("/", indexRouter);
app.use("/accomodations", accomodationRouter);
app.use("/accomodation-types", accomodationTypeRouter);
app.use("/amenities", amenityRouter);

module.exports = app;
