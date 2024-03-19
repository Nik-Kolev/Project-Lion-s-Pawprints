const { secret } = require("../config/config");
const jwt = require("../utils/jwtPromisify");

module.exports.isAuthorized = async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized access. Please log in.", code: "UNAUTHORIZED" });
  } else {
    next();
  }
};

module.exports.isGuest = async (req, res, next) => {
  if (req.user) {
    return res.status(403).json({ error: "You are already logged in.", code: "ALREADY_LOGGED_IN" });
  } else {
    next();
  }
};
