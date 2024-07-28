const mongoose = require("mongoose");
require("dotenv").config();

const amenitySeeder = require("./amenity.seeder");
const accomodationTypeSeeder = require("./accomodationType.seeder");
const accomodationSeeder = require("./accomodation.seeder");

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
  .then(() => {
    console.log("Connected to the databse");
    runSeeders();
  })
  .catch(() => console.log("Error connecting to the database"));

// run seeders
const runSeeders = async () => {
  try {
    // run accommodation type seeder
    await accomodationTypeSeeder();
    console.log("Accommodation types seeded successfully");

    // run amenities seeder
    await amenitySeeder();
    console.log("Amenities seeded successfully");

    // run accommodations seeder
    await accomodationSeeder();
    console.log("Accommodations seeded successfully");

    // close db connection
    mongoose.connection.close();
    console.log("DB seeding completed and connection closed");
  } catch (error) {
    console.error("Error during seeding:", error);
    mongoose.connection.close();
  }
};
