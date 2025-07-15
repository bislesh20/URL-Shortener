const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../services/auth");
async function handleSignUpRequest(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  return res.redirect("/");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  console.log("User", user);
  if (!user) {
    return res.render("login", { alert: null });
  }
  const sessionId = uuidv4();
  setUser(sessionId, user);
  res.cookie("uid", sessionId);
  return res.redirect("/");
}

module.exports = {
  handleSignUpRequest,
  handleUserLogin,
};
