const AccomodationType = require("./../models/accomodationType.model");

/* get all items
 *--------------------------------------------- */
const getAllAccomodationTypes = async (req, res) => {
  try {
    const accomodationTypes = await AccomodationType.find({});
    res.status(200).json(accomodationTypes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* get single item
 *--------------------------------------------- */
const getAccomodationType = async (req, res) => {
  try {
    const { id } = req.params;
    const accomodationType = await AccomodationType.findById(id);
    if (!accomodationType) {
      return res.status(404).json({ message: "Accomodation Type not found." });
    }
    res.status(200).json(accomodationType);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* create item
 *--------------------------------------------- */
const createAccomodationType = async (req, res) => {
  try {
    const accomodationType = await AccomodationType.create(req.body);
    res.status(200).json(accomodationType);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* update item
 *--------------------------------------------- */
const updateAccomodationType = async (req, res) => {
  try {
    const { id } = req.params;
    const accomodationType = await AccomodationType.findByIdAndUpdate(
      id,
      req.body
    );
    if (!accomodationType) {
      return res.status(404).json({ message: "Accomodation Type not found." });
    }
    const updatedAccomodationType = await AccomodationType.findById(id);
    res.status(200).json(updatedAccomodationType);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* delete item
 *--------------------------------------------- */
const deleteAccomodationType = async (req, res) => {
  try {
    const { id } = req.params;
    const accomodationType = await AccomodationType.findByIdAndDelete(id);
    if (!accomodationType) {
      return res.status(404).json({ message: "Accomodation Type not found." });
    }
    res
      .status(200)
      .json({ message: "Accomodation Type deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllAccomodationTypes,
  getAccomodationType,
  createAccomodationType,
  updateAccomodationType,
  deleteAccomodationType,
};
