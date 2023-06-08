const db = require("../db.js");
const jwt = require("jsonwebtoken");

function uploadProfile(req, res) {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not Authenticated");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("token is not valid");
    const values = [req.body.img, req.params.id];
    console.log(values);

    const q = "UPDATE users SET img = ? WHERE id = ?";

    db.query(q, [...values], (err, result) => {
      if (err) return res.status(500).json(err), console.log(err);

      res.json("Profile Updated");
    });
  });
}

function getUserProfile(req, res) {
  const id = req.params.id;
  const q = "SELECT img AS userImg FROM users WHERE id = ?";
  db.query(q, [id], (err, data) => {
    if (err) res.status(500).json(err);
    res.json(data[0].userImg);
  });
}

module.exports = {
  uploadProfile,
  getUserProfile,
};
