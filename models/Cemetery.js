const mongoose = require("mongoose");
const { Schema } = mongoose;

const cemeterySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  photo: String,
  address: {
    type: String,
    required: true,
  },
  // lga: {
  //   type: String,
  //   required: true,
  // },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

const Cemetery = mongoose.model("Cemetery", cemeterySchema);

module.exports = Cemetery;
