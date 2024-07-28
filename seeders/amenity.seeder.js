const Amenity = require("./../models/amenity.model");

// sample data
const amenities = [
  {
    name: "Free Wi-Fi",
    description:
      "High-speed wireless internet access available throughout the premises.",
  },
  {
    name: "Swimming Pool",
    description: "Outdoor swimming pool available for all guests.",
  },
  {
    name: "Fitness Center",
    description: "Fully equipped gym with modern workout equipment.",
  },
  {
    name: "Spa Services",
    description: "Relaxing spa services including massages, facials, and more.",
  },
  {
    name: "Room Service",
    description: "24/7 room service for all your dining needs.",
  },
  {
    name: "Parking",
    description: "Complimentary parking for guests with vehicles.",
  },
  {
    name: "Pet-Friendly",
    description: "Accommodation options available for guests with pets.",
  },
  {
    name: "Air Conditioning",
    description: "Climate control in every room to ensure your comfort.",
  },
  {
    name: "Airport Shuttle",
    description: "Convenient airport shuttle service available upon request.",
  },
  {
    name: "Restaurant",
    description: "On-site restaurant serving a variety of cuisines.",
  },
];

// seed data
const seedAmenities = async () => {
  // delete existing
  await Amenity.deleteMany({});
  // insert new
  await Amenity.insertMany(amenities);
};

module.exports = seedAmenities;
