const mongoose = require("mongoose");

const { Schema } = mongoose;

const StateSchema = new Schema({
  id: String,
  name: String,
  country_id: String,
});

const State = mongoose.model("State", StateSchema);

module.exports = State;
