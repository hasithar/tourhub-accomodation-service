const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define location schema
const locationSchema = new Schema(
  {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    province: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    coordinates: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
  },
  { _id: false }
);

// define contact details schema
const contactDetailsSchema = new Schema(
  {
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: false,
    },
  },
  { _id: false }
);

// define ratings schema
const ratingsSchema = new Schema(
  {
    customerRating: {
      type: Number,
      min: 0,
      max: 10,
    },
    starRating: {
      type: Number,
      min: 0,
      max: 5,
    },
  },
  { _id: false }
);

// define contacts schema
const contactSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: false },
    phone: { type: String, required: false },
    role: { type: String, required: true },
    remarks: { type: String },
  },
  { _id: false }
);

// define accomodation schema
const accommodationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: Schema.Types.ObjectId,
      ref: "AccommodationType",
      required: true,
    },
    description: {
      type: String,
    },
    contactDetails: contactDetailsSchema,
    rating: ratingsSchema,
    location: locationSchema,
    contacts: [contactSchema],
    amenities: [
      {
        type: Schema.Types.ObjectId,
        ref: "Amenity",
      },
    ],
    numberOfReviews: {
      type: Number,
      default: 0,
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

// create 2dsphere index on the location.coordinates for geospatial queries
accommodationSchema.index({ "location.coordinates": "2dsphere" });

// create accommodation model
const Accommodation = mongoose.model("Accommodation", accommodationSchema);

module.exports = Accommodation;
