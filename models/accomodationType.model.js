const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define accomodation type schema
const accommodationTypeSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: String,
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const AccommodationType = mongoose.model(
  "AccommodationType",
  accommodationTypeSchema
);

module.exports = AccommodationType;
