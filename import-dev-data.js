const fs = require("fs");
const mongoose = require("mongoose");
// const Country = require("./models/Country");
// const State = require("./models/State");
const City = require("./models/City");

const db_url = "mongodb://localhost:27017/muslim-cemeteries";

mongoose
  .connect(db_url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((con) => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log("failed to connect");
  });

// const countries = JSON.parse(
//   fs.readFileSync(`${__dirname}/countries.json`, "utf-8")
// );
// const states = JSON.parse(fs.readFileSync(`${__dirname}/states.json`, "utf-8"));

const cities = JSON.parse(
  fs.readFileSync(`${__dirname}/cities1.json`, "utf-8")
);

const importData = async () => {
  try {
    City.create(cities.cities).then(() => {
      console.log("files uploaded");
    });
  } catch (err) {
    console.log(err);
  }
};

importData();
