const User = require("../db/models/user");

const loggedIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

const isAdmin = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).send("Not allowed!");
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  loggedIn,
  isAdmin,
};
