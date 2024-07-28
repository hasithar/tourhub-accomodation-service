var express = require("express");
var router = express.Router();
const {
  getAllAmenities,
  getAmenity,
  createAmenity,
  updateAmenity,
  deleteAmenity,
} = require("./../controllers/amenity.controller");

// get all items
router.get("/", getAllAmenities);

// get single item
router.get("/:id", getAmenity);

// create item
router.post("/", createAmenity);

// update item
router.patch("/:id", updateAmenity);

// delete item
router.delete("/:id", deleteAmenity);

module.exports = router;
