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
    res.status(201).json({ result: plant });
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
      res.status(404).json({ err: "Not found" });
      return;
    }
    res.status(200).json({ result: plant });
  } catch (err) {
    next(err);
  }
};

const getPlantByName = async (req, res, next) => {
  try {
    const plant = await PlantSchema.findOne({ name: req.query.name });
    if (plant) {
      res.status(200).json({ match: plant, partialMatches: [] });
    } else {
      const request = req.query.name;
      const plants = await PlantSchema.find(
        {
          $text: { $search: request },
        },
        { score: { $meta: "textScore" } }
      ).sort({ score: { $meta: "textScore" } });
      res.status(200).json({ match: null, partialMatches: plants });
    }
  } catch (err) {
    next(err);
  }
};

const deletePlant = async (req, res, next) => {
  try {
    console.log(req.params, "here");
    const plant = await PlantSchema.findById(req.params.id);
    if (!plant) {
      res.status(404).json({ err: "Not found" });
      return;
    }
    await plant.remove();
    res.status(200).json({ result: "done", deletedPlant: plant });
  } catch (err) {
    next(err);
  }
};

const updatePlant = async (req, res, next) => {
  try {
    const plant = await PlantSchema.findById(req.params.id);
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
  getPlantByName,
  deletePlant,
  updatePlant,
};
