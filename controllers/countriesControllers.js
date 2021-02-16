const Country = require("../models/Country");
const State = require("../models/State");
const City = require("../models/City");

exports.getAllCountries = async (req, res) => {
  const countries = await Country.find();

  res.json({
    data: countries,
  });
};

exports.getAllStates = async (req, res) => {
  const states = await State.find({
    country_id: req.params.id,
  });

  res.json({
    data: states,
  });
};

exports.getAllCities = async (req, res) => {
  const cities = await City.find({
    state_id: req.params.id,
  }).select("-__v -_id");

  res.json({
    data: cities,
  });
};
