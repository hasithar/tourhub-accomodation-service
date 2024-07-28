const Accommodation = require("./../models/accomodation.model");
const AccomodationType = require("./../models/accomodationType.model");
const Amenity = require("./../models/amenity.model");

// sample data
const accommodations = async (accomodationTypes, amenities) => [
  {
    name: "Jetwing Colombo Seven",
    description:
      "A luxury hotel located in the heart of Colombo with a rooftop infinity pool.",
    type: accomodationTypes.find((type) => type.name === "Hotel")._id,
    contactDetails: {
      phone: "+94 112 558 700",
      email: "info@jetwinghotels.com",
      website: "https://www.jetwinghotels.com/jetwingcolomboseven/",
    },
    rating: {
      customerRating: 9,
      starRating: 5,
    },
    location: {
      address: "57 Ward Pl",
      city: "Colombo",
      province: "Western",
      postalCode: "00700",
      country: "Sri Lanka",
      coordinates: {
        type: "Point",
        coordinates: [79.857603, 6.917464],
      },
    },
    contacts: [
      {
        name: "Jane Doe",
        phone: "+94 112 558 700 ext 101",
        email: "jane.doe@jetwinghotels.com",
        role: "Reservation Agent",
      },
      {
        name: "John Smith",
        phone: "+94 112 558 700 ext 102",
        email: "john.smith@jetwinghotels.com",
        role: "Manager",
      },
      {
        name: "Alice Brown",
        phone: "+94 112 558 700 ext 103",
        email: "alice.brown@jetwinghotels.com",
        role: "Sales Agent",
      },
    ],
    amenities: [
      amenities.find((amenity) => amenity.name === "Free Wi-Fi"),
      amenities.find((amenity) => amenity.name === "Swimming Pool"),
      amenities.find((amenity) => amenity.name === "Fitness Center"),
      amenities.find((amenity) => amenity.name === "Spa Services"),
      amenities.find((amenity) => amenity.name === "Restaurant"),
      amenities.find((amenity) => amenity.name === "Parking"),
      amenities.find((amenity) => amenity.name === "Air Conditioning"),
    ],
    numberOfReviews: 0,
    isActive: true,
  },
  {
    name: "Heritance Kandalama",
    description:
      "A unique eco-hotel nestled in the heart of the Cultural Triangle.",
    type: accomodationTypes.find((type) => type.name === "Resort")._id,
    contactDetails: {
      phone: "+94 662 283 500",
      email: "info@heritancehotels.com",
      website: "https://www.heritancehotels.com/kandalama/",
    },
    rating: {
      customerRating: 9,
      starRating: 5,
    },
    location: {
      address: "P.O Box 11",
      city: "Dambulla",
      province: "Central",
      postalCode: "21100",
      country: "Sri Lanka",
      coordinates: {
        type: "Point",
        coordinates: [80.71862, 7.906221],
      },
    },
    contacts: [
      {
        name: "Emily Johnson",
        phone: "+94 662 283 500 ext 201",
        email: "emily.johnson@heritancehotels.com",
        role: "Reservation Agent",
      },
      {
        name: "Michael Lee",
        phone: "+94 662 283 500 ext 202",
        email: "michael.lee@heritancehotels.com",
        role: "Manager",
      },
      {
        name: "Samantha Green",
        phone: "+94 662 283 500 ext 203",
        email: "samantha.green@heritancehotels.com",
        role: "Sales Agent",
      },
    ],
    amenities: [
      amenities.find((amenity) => amenity.name === "Free Wi-Fi"),
      amenities.find((amenity) => amenity.name === "Swimming Pool"),
      amenities.find((amenity) => amenity.name === "Fitness Center"),
      amenities.find((amenity) => amenity.name === "Spa Services"),
      amenities.find((amenity) => amenity.name === "Restaurant"),
      amenities.find((amenity) => amenity.name === "Parking"),
      amenities.find((amenity) => amenity.name === "Air Conditioning"),
      amenities.find((amenity) => amenity.name === "Pet-Friendly"),
    ],
    numberOfReviews: 0,
    isActive: true,
  },
  {
    name: "Cinnamon Lodge Habarana",
    description:
      "A luxury resort situated in the heart of Sri Lanka's Cultural Triangle.",
    type: accomodationTypes.find((type) => type.name === "Resort")._id,
    contactDetails: {
      phone: "+94 662 270 011",
      email: "info@cinnamonhotels.com",
      website: "https://www.cinnamonhotels.com/cinnamonlodgehabarana",
    },
    rating: {
      customerRating: 9,
      starRating: 5,
    },
    location: {
      address: "Habarana",
      city: "Habarana",
      province: "North Central",
      postalCode: "50150",
      country: "Sri Lanka",
      coordinates: {
        type: "Point",
        coordinates: [80.74362, 8.027372],
      },
    },
    contacts: [
      {
        name: "David White",
        phone: "+94 662 270 011 ext 301",
        email: "david.white@cinnamonhotels.com",
        role: "Reservation Agent",
      },
      {
        name: "Angela Black",
        phone: "+94 662 270 011 ext 302",
        email: "angela.black@cinnamonhotels.com",
        role: "Manager",
      },
      {
        name: "James Brown",
        phone: "+94 662 270 011 ext 303",
        email: "james.brown@cinnamonhotels.com",
        role: "Sales Agent",
      },
    ],
    amenities: [
      amenities.find((amenity) => amenity.name === "Free Wi-Fi"),
      amenities.find((amenity) => amenity.name === "Swimming Pool"),
      amenities.find((amenity) => amenity.name === "Fitness Center"),
      amenities.find((amenity) => amenity.name === "Spa Services"),
      amenities.find((amenity) => amenity.name === "Restaurant"),
      amenities.find((amenity) => amenity.name === "Parking"),
      amenities.find((amenity) => amenity.name === "Air Conditioning"),
      amenities.find((amenity) => amenity.name === "Airport Shuttle"),
    ],
    numberOfReviews: 0,
    isActive: true,
  },
  {
    name: "Galle Face Hotel",
    description:
      "A historic luxury hotel located on the oceanfront of Colombo.",
    type: accomodationTypes.find((type) => type.name === "Hotel")._id,
    contactDetails: {
      phone: "+94 112 541 010",
      email: "info@gallefacehotel.net",
      website: "https://www.gallefacehotel.com/",
    },
    rating: {
      customerRating: 9,
      starRating: 5,
    },
    location: {
      address: "2 Galle Rd",
      city: "Colombo",
      postalCode: "00300",
      province: "Western",
      country: "Sri Lanka",
      coordinates: {
        type: "Point",
        coordinates: [79.849998, 6.921837],
      },
    },
    contacts: [
      {
        name: "Olivia Martin",
        phone: "+94 112 541 010 ext 401",
        email: "olivia.martin@gallefacehotel.net",
        role: "Reservation Agent",
      },
      {
        name: "Christopher Scott",
        phone: "+94 112 541 010 ext 402",
        email: "christopher.scott@gallefacehotel.net",
        role: "Manager",
      },
      {
        name: "Sophia Wilson",
        phone: "+94 112 541 010 ext 403",
        email: "sophia.wilson@gallefacehotel.net",
        role: "Sales Agent",
      },
    ],
    amenities: [
      amenities.find((amenity) => amenity.name === "Free Wi-Fi"),
      amenities.find((amenity) => amenity.name === "Swimming Pool"),
      amenities.find((amenity) => amenity.name === "Fitness Center"),
      amenities.find((amenity) => amenity.name === "Spa Services"),
      amenities.find((amenity) => amenity.name === "Restaurant"),
      amenities.find((amenity) => amenity.name === "Parking"),
      amenities.find((amenity) => amenity.name === "Air Conditioning"),
      amenities.find((amenity) => amenity.name === "Pet-Friendly"),
      amenities.find((amenity) => amenity.name === "Room Service"),
    ],
    numberOfReviews: 0,
    isActive: true,
  },
  {
    name: "The Kingsbury Colombo",
    description:
      "A premier luxury hotel offering stunning views of the Indian Ocean.",
    type: accomodationTypes.find((type) => type.name === "Hotel")._id,
    contactDetails: {
      phone: "+94 112 421 221",
      email: "info@thekingsburyhotel.com",
      website: "https://www.thekingsburyhotel.com/",
    },
    rating: {
      customerRating: 9,
      starRating: 5,
    },
    location: {
      address: "48 Janadhipathi Mawatha",
      city: "Colombo",
      province: "Western",
      postalCode: "00100",
      country: "Sri Lanka",
      coordinates: {
        type: "Point",
        coordinates: [79.84472, 6.931943],
      },
    },
    contacts: [
      {
        name: "Emma Lewis",
        phone: "+94 112 421 221 ext 501",
        email: "emma.lewis@thekingsburyhotel.com",
        role: "Reservation Agent",
      },
      {
        name: "Liam Walker",
        phone: "+94 112 421 221 ext 502",
        email: "liam.walker@thekingsburyhotel.com",
        role: "Manager",
      },
      {
        name: "Ava Robinson",
        phone: "+94 112 421 221 ext 503",
        email: "ava.robinson@thekingsburyhotel.com",
        role: "Sales Agent",
      },
    ],
    amenities: [
      amenities.find((amenity) => amenity.name === "Free Wi-Fi"),
      amenities.find((amenity) => amenity.name === "Swimming Pool"),
      amenities.find((amenity) => amenity.name === "Fitness Center"),
      amenities.find((amenity) => amenity.name === "Spa Services"),
      amenities.find((amenity) => amenity.name === "Restaurant"),
      amenities.find((amenity) => amenity.name === "Parking"),
      amenities.find((amenity) => amenity.name === "Air Conditioning"),
      amenities.find((amenity) => amenity.name === "Airport Shuttle"),
      amenities.find((amenity) => amenity.name === "Room Service"),
    ],
    numberOfReviews: 0,
    isActive: true,
  },
];

// seed data
const seedAccomodations = async () => {
  // delete existing
  await Accommodation.deleteMany({});

  // get accomodation types
  const accomodationTypes = await AccomodationType.find();
  // get amenities
  const amenities = await Amenity.find();

  // build data with references
  const accomodationWithReferences = await accommodations(
    accomodationTypes,
    amenities
  );

  // insert new
  await Accommodation.insertMany(accomodationWithReferences);
};

module.exports = seedAccomodations;
