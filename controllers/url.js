const URL = require("../models/url");
const { nanoid } = require("nanoid");
async function handleNewUrl(req, res) {
  const body = req.body;
  if (!body.url) {
    return res.status(400).json({ error: "bad url request" });
  }
  const shortID = nanoid(8); // generate a new short url
  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });
  return res.json({ id: shortID });
}

async function handleGetRedirectURLs(req, res) {
  const shortId = req.params.shortID;
  const entry = URL.findOne({ shortId });
  entry.visitedHistory.push({ timestamp: Date.now() });
}

module.exports = {
  handleNewUrl,
  handleGetRedirectURLs,
};
