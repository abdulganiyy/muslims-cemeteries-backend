const mongoose = require("mongoose");

const { Schema } = mongoose;

const CitySchema = new Schema({
  id: String,
  name: String,
  state_id: String,
});

const City = mongoose.model("City", CitySchema);

module.exports = City;
