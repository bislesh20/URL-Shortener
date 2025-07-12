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
  return res.render("home", { id: shortID });
}

async function handleGetRedirectURLs(req, res) {
  const shortId = req.params.shortId;
  const entry = await URL.findOne({ shortId });
  if (!entry) {
    return res.status(404).send("url not found");
  }
  entry.visitHistory.push({ timestamp: Date.now() });
  await entry.save();

  res.redirect(entry.redirectURL);
}

module.exports = {
  handleNewUrl,
  handleGetRedirectURLs,
};
