const express = require("express");
const { getUserProfile, uploadProfile } = require("../controllers/user.js");

const router = express.Router();

router.put("/:id", uploadProfile);
router.get("/:id", getUserProfile);

module.exports = router;
