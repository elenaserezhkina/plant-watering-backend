const express = require("express");
const router = express.Router();
const plantController = require("../controllers/plant");
const basicAuth = require("express-basic-auth");
require("dotenv").config();

const user = process.env.USER_NAME;
const password = process.env.USER_PASSWORD;

const authorize = basicAuth({
  users: { [user]: password },
});

router.post("/", authorize, plantController.createPlant);
router.get("/", plantController.getPlants);
router.get("/:id", plantController.getPlantById);
router.delete("/:id", authorize, plantController.deletePlant);
router.patch("/:id", authorize, plantController.updatePlant);

module.exports = router;
