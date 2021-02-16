const express = require("express");
const {
  getAllCemeteries,
  createACemetery,
  getAllFiles,
  getAFile,
} = require("../controllers/cemeteriesControllers");

const router = express.Router();

router.get("/", getAllCemeteries);

router.get("/files", getAllFiles);

router.get("/files/:filename", getAFile);

router.post("/", createACemetery);

module.exports = router;
