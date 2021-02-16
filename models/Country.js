const mongoose = require("mongoose");

const { Schema } = mongoose;

const countrySchema = new Schema({
  id: Number,
  name: String,
  sortname: String,
  phoneCode: Number,
});

const Country = mongoose.model("Country", countrySchema);

module.exports = Country;
