const express = require("express");
const {
  addPost,
  deletePost,
  getOnePost,
  getAllPosts,
  updatePost,
  getMyPosts,
} = require("../controllers/post.js");

const router = express.Router();

router.get("/", getAllPosts);
router.get("/myposts/:id", getMyPosts);
router.get("/:id", getOnePost);
router.post("/", addPost);
router.delete("/:id", deletePost);
router.put("/:id", updatePost);

// module.exports = {
//   userRoutes: router,
// };

module.exports = router;
