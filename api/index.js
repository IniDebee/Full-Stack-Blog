const express = require("express");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const authRoutes = require("./routes/auth.js");
const userRoutes = require("./routes/users.js");
const postRoutes = require("./routes/posts.js");
// const db = require("./config/db");
// const router = express.Router();
const cors = require("cors");
const app = express();
app.use(cors());
// const PORT = process.env.port || 3001;
const PORT = 3001;
app.use(express.json());
app.use(cookieParser());
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);

  console.log(file.filename);
});

// 	PROFILE
const profileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../client/public/profile");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});
const profileUpload = multer({ storage: profileStorage });
app.post("/api/profileUpload", profileUpload.single("profile"), (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);

  console.log(file.filename, "profileUpload");
  // console.log(req.method);
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
