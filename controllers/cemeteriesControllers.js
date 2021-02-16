const Cemetery = require("../models/Cemetery");
const mongoose = require("mongoose");
const multer = require("multer");
let path = require("path");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
let crypto = require("crypto");

const db_url = process.env.db;

const conn = mongoose.createConnection(db_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

let gfs;

conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});

const storage = new GridFsStorage({
  url: db_url,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }

        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileinfo = {
          filename: filename,
          bucketName: "uploads",
        };

        resolve(fileinfo);
      });
    });
  },
});

// let connect = mongoose.createConnection(db_url,{
//   useNewUrlParser:true,
//   useUnifiedTopology:true
// })

let upload = multer({ storage }).single("photo");

exports.getAllCemeteries = async function (req, res) {
  const cemeteries = await Cemetery.find();

  res.json({
    status: "successful",
    data: {
      cemeteries,
    },
  });
};

exports.createACemetery = async function (req, res) {
  upload(req, res, async (err) => {
    if (err) {
      console.log(err);
      res.json({
        err,
      });
    } else {
      const cemeterybody = { ...req.body, photo: req.file.filename };
      console.log(req.body, req.file);
      const cemetery = await Cemetery.create({ ...cemeterybody });
      res.json({
        cemetery,
      });
    }
  });
};

//@route get /files
//@desc get all files

exports.getAllFiles = (req, res) => {
  gfs.files.find().toArray((err, files) => {
    if (!files || files.length === 0) {
      res.status(404).json({
        err: "No such file",
      });
    } else {
      // const readstream = gfs.createReadStream(file.filename);
      // readstream.pipe(res);
      res.json({
        files,
      });
    }
  });
};

//@route get files/:filename
//@desc fetch a single file

exports.getAFile = (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (err) {
      res.json({
        err,
      });
    }

    const readstream = gfs.createReadStream(file.filename);
    readstream.pipe(res);
  });
};
