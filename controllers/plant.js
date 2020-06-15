const PlantSchema = require("../models/plant");

const createPlant = async (req, res, next) => {
  try {
    const plant = await PlantSchema.create({
      name: req.body.name,
      image: req.body.image,
      watering: req.body.watering,
      favorite: req.body.favorite,
      description: req.body.description,
      interestingFact: req.body.interestingFact,
    });
    res.status(200).json({ result: plant });
  } catch (err) {
    next(err);
  }
};

const getPlants = async (req, res, next) => {
  try {
    const plants = await PlantSchema.find();
    res.status(200).json({ result: plants });
  } catch (err) {
    next(err);
  }
};

const getPlantById = async (req, res, next) => {
  try {
    const plant = await PlantSchema.findById(req.params.id);
    if (!plant) {
      throw new Error("Not found");
    }
    res.status(200).json({ result: plant });
  } catch (err) {
    next(err);
  }
};

const deletePlant = async (req, res, next) => {
  try {
    const plant = await getPlantById(req.params.id);
    await plant.remove();
    res.status(200).json({ result: "done", deletedPlant: plant });
  } catch (err) {
    next(err);
  }
};

// TODO
const updatePlant = async (req, res, next) => {
  try {
    const plant = await getPlantById(req.params.id);
    Object.assign(plant, req.body);
    plant.save();
    res.status(200).json({ result: "done", updatedPlant: plant });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createPlant,
  getPlants,
  getPlantById,
  deletePlant,
  updatePlant,
};
