const db = require("../db.js");
const jwt = require("jsonwebtoken");

function getAllPosts(req, res) {
  const q = req.query.cat
    ? "SELECT * FROM posts WHERE cat=?"
    : "SELECT * FROM posts";

  // db.query(q, [req.query.cat], (err, data) => {
  //   if (err) return res.status(500).send(err);

  //   return res.status(200).json(data);
  // });
  db.query(q, [req.query.cat], (err, data) => {
    if (err) res.status(500).json(err);

    res.status(200).json(data);
  });
}

function getMyPosts(req, res) {
  // const userid = req.body.userid;
  // const userid = req.params.id;
  const q = "SELECT * FROM posts WHERE uid = ?";
  db.query(q, [userid], (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(result);
  });
  console.log(req.method, "my Posts by my id =", userid);
}

function getOnePost(req, res) {
  const id = req.params.id;
  const q =
    "SELECT p.id, `username`, `title`, `desc`, `authorname`, `authorrole`, `authorimg`, p.postimg, u.img AS userImg, `cat`, `date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ? ";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data[0]);
  });
  // const id = req.params.id;
  // const q =
  //   "SELECT `username`, `title`, `desc`, p.id, p.lastupdated AS lastDate, p.img, u.img AS userProfile, `cat`, `date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ?";

  // db.query(q, [id], (error, result) => {
  //   if (error) return res.status(500).json(error);
  //   res.status(200).json(result[0]);
  // });

  console.log(req.method, "single Posts by post id =", id);
}

function addPost(req, res) {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "INSERT INTO posts(`title`, `desc`, `postimg`, `cat`, `date`, `authorimg`,`authorname`, `authorrole`, `uid`) VALUES (?)";

    const values = [
      req.body.title,
      req.body.desc,
      req.body.postimg,
      req.body.cat,
      req.body.date,
      req.body.authorimg,
      req.body.authorname,
      req.body.authorrole,
      userInfo.id,
    ];

    db.query(q, [values], (err, result) => {
      // if (err)  return res.status(500).json(err);
      // return res.json("Post has been created.");
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }
      res.json("Post created!");
    });
  });
  console.log(req.method, "new Post");
}

function deletePost(req, res) {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const postId = req.params.id;
    const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";

    db.query(q, [postId, userInfo.id], (err, result) => {
      if (err) return res.status(403).json("You can delete only your post!");

      return res.json("Post has been deleted!");
    });
    // console.log(req.method + "d", "Post with id =", postId);
  });
}

function updatePost(req, res) {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    // const postId = req.params.id;
    const q =
      "UPDATE posts SET `title`=?, `desc`=?, `postimg`=?, `cat`=?, `date`=?, `authorimg`=?, `authorname`=?, `authorrole`=? WHERE `id` = ? AND `uid` = ?";

    const values = [
      req.body.title,
      req.body.desc,
      req.body.postimg,
      req.body.cat,
      req.body.date,
      req.body.authorimg,
      req.body.authorname,
      req.body.authorrole,
    ];

    // console.log(req.body.postimg);
    // db.query(q, [...values, postId, userInfo.id], (err, data) => {
    //   if (err) return res.status(500).json(err);
    //   return res.json("Post has been updated.");
    // });
    db.query(q, [...values, req.params.id, userInfo.id], (err, result) => {
      console.log(err);
      if (err) return res.status(500).json(err);
      res.json("Post Has Been Updated");
    });
  });
  console.log(req.method, "updated Post");
}

module.exports = {
  getAllPosts,
  getMyPosts,
  getOnePost,
  updatePost,
  deletePost,
  addPost,
};
