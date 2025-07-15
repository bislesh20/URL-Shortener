const { getUser } = require("../services/auth");
async function restrictToLoggedInUserOnly(req, res, next) {
  const userUid = req.cookies?.uid;
  if (!userUid) {
    return res.render("login", { alert: null });
  }
  const user = getUser(userUid);
  if (!user) {
    return res.redirect("/login");
  }
  req.user = user;
  next();
}
module.exports = {
  restrictToLoggedInUserOnly,
};
