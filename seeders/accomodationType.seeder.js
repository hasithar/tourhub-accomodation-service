const AccommodationType = require("./../models/accomodationType.model");

// sample data
const accommodationTypes = [
  {
    name: "Hotel",
    description:
      "A place offering accommodation, meals, and other services for travelers and tourists.",
  },
  {
    name: "Hostel",
    description:
      "An establishment that provides inexpensive food and lodging for a specific group of people, such as students, workers, or travelers.",
  },
  {
    name: "Bed and Breakfast",
    description:
      "A private home offering a room to guests, including breakfast.",
  },
  {
    name: "Resort",
    description:
      "A place that is frequented for holidays or recreation or for a particular purpose.",
  },
  {
    name: "Villa",
    description:
      "A large and luxurious country residence with extensive grounds.",
  },
  {
    name: "Guest House",
    description: "A private house offering accommodations for paying guests.",
  },
  {
    name: "Boutique Hotel",
    description:
      "A small, stylish hotel, typically situated in a fashionable urban location.",
  },
  {
    name: "Motel",
    description:
      "A roadside hotel designed primarily for motorists, typically having the rooms arranged in a low building with parking directly outside.",
  },
  {
    name: "Inn",
    description:
      "An establishment providing accommodations, food, and drink, especially for travelers.",
  },
  {
    name: "Cottage",
    description: "A small house, typically one in the country.",
  },
];

// seed data
const seedAccomodationTypes = async () => {
  // delete existing
  await AccommodationType.deleteMany({});
  // insert new
  await AccommodationType.insertMany(accommodationTypes);
};

module.exports = seedAccomodationTypes;
