const Accomodation = require("./../models/accomodation.model");

/* get all items
 *--------------------------------------------- */
const getAllAccomotaions = async (req, res) => {
  try {
    const accomodations = await Accomodation.find({});
    res.status(200).json(accomodations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* get single item
 *--------------------------------------------- */
const getAccomodation = async (req, res) => {
  try {
    const { id } = req.params;
    const accomodation = await Accomodation.findById(id);
    if (!accomodation) {
      return res.status(404).json({ message: "Accomodation not found." });
    }
    res.status(200).json(accomodation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* create item
 *--------------------------------------------- */
const createAccomodation = async (req, res) => {
  try {
    const accomodation = await Accomodation.create(req.body);
    res.status(200).json(accomodation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* update item
 *--------------------------------------------- */
const updateAccomodation = async (req, res) => {
  try {
    const { id } = req.params;
    const accomodation = await Accomodation.findByIdAndUpdate(id, req.body);
    if (!accomodation) {
      return res.status(404).json({ message: "Accomodation not found." });
    }
    const updatedAccomodation = await Accomodation.findById(id);
    res.status(200).json(updatedAccomodation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* delete item
 *--------------------------------------------- */
const deleteAccomodation = async (req, res) => {
  try {
    const { id } = req.params;
    const accomodation = await Accomodation.findByIdAndDelete(id);
    if (!accomodation) {
      return res.status(404).json({ message: "Accomodation not found." });
    }
    res.status(200).json({ message: "Accomodation deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllAccomotaions,
  getAccomodation,
  createAccomodation,
  updateAccomodation,
  deleteAccomodation,
};
