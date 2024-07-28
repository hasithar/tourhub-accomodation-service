const Amenity = require("./../models/amenity.model");

/* get all items
 *--------------------------------------------- */
const getAllAmenities = async (req, res) => {
  try {
    const amenities = await Amenity.find({});
    res.status(200).json(amenities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* get single item
 *--------------------------------------------- */
const getAmenity = async (req, res) => {
  try {
    const { id } = req.params;
    const amenity = await Amenity.findById(id);
    if (!amenity) {
      return res.status(404).json({ message: "Amenity not found." });
    }
    res.status(200).json(amenity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* create item
 *--------------------------------------------- */
const createAmenity = async (req, res) => {
  try {
    const amenity = await Amenity.create(req.body);
    res.status(200).json(amenity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* update item
 *--------------------------------------------- */
const updateAmenity = async (req, res) => {
  try {
    const { id } = req.params;
    const amenity = await Amenity.findByIdAndUpdate(id, req.body);
    if (!amenity) {
      return res.status(404).json({ message: "Amenity not found." });
    }
    const updatedAmenity = await Amenity.findById(id);
    res.status(200).json(updatedAmenity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* delete item
 *--------------------------------------------- */
const deleteAmenity = async (req, res) => {
  try {
    const { id } = req.params;
    const amenity = await Amenity.findByIdAndDelete(id);
    if (!amenity) {
      return res.status(404).json({ message: "Amenity not found." });
    }
    res.status(200).json({ message: "Amenity deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllAmenities,
  getAmenity,
  createAmenity,
  updateAmenity,
  deleteAmenity,
};
