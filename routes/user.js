const express = require("express");
const { handleSignUpRequest, handleUserLogin } = require("../controllers/user");
const router = express.Router();

router.post("/", handleSignUpRequest);
router.post("/login", handleUserLogin);
module.exports = router;
