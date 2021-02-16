const express = require("express");
const {
  getAllCountries,
  getAllStates,
  getAllCities,
} = require("../controllers/countriesControllers");

const router = express.Router();

router.get("/", getAllCountries);

router.get("/states/:id", getAllStates);

router.get("/cities/:id", getAllCities);

module.exports = router;
