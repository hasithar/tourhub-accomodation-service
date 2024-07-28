const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define amenity schema
const amenitySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// create amenity model
const Amenity = mongoose.model("Amenity", amenitySchema);

module.exports = Amenity;
