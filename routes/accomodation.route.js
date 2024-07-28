var express = require("express");
var router = express.Router();
const {
  getAllAccomotaions,
  getAccomodation,
  createAccomodation,
  updateAccomodation,
  deleteAccomodation,
} = require("./../controllers/accomodation.controller");

// get all items
router.get("/", getAllAccomotaions);

// get single item
router.get("/:id", getAccomodation);

// create item
router.post("/", createAccomodation);

// update item
router.patch("/:id", updateAccomodation);

// delete item
router.delete("/:id", deleteAccomodation);

module.exports = router;
