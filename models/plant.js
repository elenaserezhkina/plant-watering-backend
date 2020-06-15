const mongoose = require("mongoose");

// Plant schema
const plantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: String,
  watering: { type: String, required: true },
  description: String,
  interestingFact: String,
  favorite: { type: Boolean, default: false },
});

const PlantSchema = mongoose.model("plants", plantSchema);

module.exports = PlantSchema;
