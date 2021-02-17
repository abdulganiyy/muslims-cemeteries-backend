const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.static("./public"));
app.use(cors());
app.use(express.json());

const usersRoutes = require("./routes/usersRoutes");
const cemeteriesRoutes = require("./routes/cemeteriesRoutes");
const countriesRoutes = require("./routes/CountriesRoutes");

const db_url = process.env.db_prod;

mongoose
  .connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((con) => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log("failed to connect");
  });

app.use("/users", usersRoutes);
app.use("/cemeteries", cemeteriesRoutes);
app.use("/countries", countriesRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log("connected to server");
});
