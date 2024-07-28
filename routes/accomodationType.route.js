var express = require("express");
var router = express.Router();
const {
  getAllAccomodationTypes,
  getAccomodationType,
  createAccomodationType,
  updateAccomodationType,
  deleteAccomodationType,
} = require("./../controllers/acoomodationType.controller");

// get all items
router.get("/", getAllAccomodationTypes);

// get single item
router.get("/:id", getAccomodationType);

// create item
router.post("/", createAccomodationType);

// update item
router.patch("/:id", updateAccomodationType);

// delete item
router.delete("/:id", deleteAccomodationType);

module.exports = router;
