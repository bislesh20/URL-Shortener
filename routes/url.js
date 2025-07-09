const express = require("express");
const router = express.Router();
const { handleNewUrl, handleGetRedirectURLs } = require("../controllers/url");

router.post("/", handleNewUrl);
router.get("/:shortId", handleGetRedirectURLs);

module.exports = router;
