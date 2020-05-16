const { Router } = require("express");
const User = require("../models/User");
const router = Router();
const auth = require("../middleware/auth.middleware");
const multer = require("multer");
const config = require("config");
const GridFsStorage = require("multer-gridfs-storage");
const crypto = require("crypto");
const mongoose = require("mongoose");
const Grid = require("gridfs-stream");

const conn = mongoose.createConnection(process.env.MONGODB_URI || config.get("mongoUri"), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let gfs;

conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
  console.log("Connection Successful");
});

const storage = new GridFsStorage({
  url: process.env.MONGODB_URI || config.get("mongoUri"),
  options: { useUnifiedTopology: true },
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = file.originalname;
        const fileInfo = {
          filename: "file_" + Date.now(),
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});

const upload = multer({ storage });

// /api/file/userPhoto
router.post("/userPhoto", upload.single("img"), auth, async (req, res) => {
  try {
    const authUserId = req.user.userId; /// Get from auth middleware
    const user = await User.findById(authUserId);
    const photo = req.file.filename;

    if (user.photo) {
      await gfs.remove({ filename: user.photo, root: "uploads" }, (err, gridStore) => {
        if (err) {
          return res.status(404).json({ err: err });
        }
      });
    }

    await user.updateOne({ photo: photo });

    res.status(201).json({ photo: photo });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, try it again" });
  }
});

/// api/file/:filename
router.get("/:filename", (req, res) => {
  try {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
      // Check if file
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: "No file exists",
        });
      }

      // Check if image
      if (file.contentType === "image/jpeg" || file.contentType === "image/png") {
        // Read output to browser
        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
      } else {
        res.status(404).json({
          err: "Not an image",
        });
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, try it again" });
  }
});

// /api/file/deleteUserPhoto
router.delete("/deleteUserPhoto", auth, async (req, res) => {
  try {
    const authUserId = req.user.userId;
    const user = await User.findById(authUserId);

    await gfs.remove({ filename: user.photo, root: "uploads" }, (err, gridStore) => {
      if (err) {
        return res.status(404).json({ err: err });
      }
    });

    await user.updateOne({ photo: "" });

    res.status(200).json({ message: "Photo deleted!" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, try it again" });
  }
});

module.exports = router;
