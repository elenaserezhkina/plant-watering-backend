const mongoose = require("mongoose");

// Plant schema
// watering is a number. Once in how many days the plant should be watered.
// For ex. watering: 5 means that the plant should be watered ones every 5 days.
const plantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  watering: { type: [Number], required: true },
  description: String,
  interestingFact: String,
  favorite: { type: Boolean, default: false },
  image: { type: [String] },
});
plantSchema.index({ name: "text" });

const PlantSchema = mongoose.model("Plant", plantSchema);

module.exports = PlantSchema;
