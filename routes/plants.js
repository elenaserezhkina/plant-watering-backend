const express = require("express");
const router = express.Router();
const plantController = require("../controllers/plant");

router.post("/", plantController.createPlant);
router.get("/", plantController.getPlants);
router.get("/:id", plantController.getPlantById);
router.delete("/:id", plantController.deletePlant);
router.patch("/:id", plantController.updatePlant);

router.get("/:name", plantController.getPlantByName);

module.exports = router;
