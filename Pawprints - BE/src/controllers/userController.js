const userController = require("express").Router();
const userModel = require("../models/User");
const errorHandler = require("../utils/errorHandler");
const bcrypt = require("bcrypt");
const { tokenCreator } = require("../utils/tokenCreator");
const { isGuest } = require("../middlewares/guards");

userController.post("/login", isGuest, async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  let errors = [];

  Object.entries(req.body).forEach(([fieldName, value]) => {
    if (value === "") {
      let errorName = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
      errors.push(`${errorName} is required.`);
    }
  });
  if (errors.length > 0) {
    return res.status(400).json({ error: errors, code: "INVALID_INPUT" });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Email or Password are invalid", code: "INVALID_CREDENTIALS" });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(401).json({ error: "Email or Password are invalid", code: "INVALID_CREDENTIALS" });
    }

    const token = await tokenCreator(user);
    const data = { _id: user._id, email: user.email, admin: user.admin };
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json(data);
  } catch (error) {
    errorHandler(error, res, req);
  }
});

userController.post("/register", isGuest, async (req, res) => {
  const { email, password, rePass } = req.body;

  let errors = [];

  Object.entries(req.body).forEach(([fieldName, value]) => {
    if (value === "") {
      let errorName = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
      errors.push(`${errorName} is required.`);
    }
  });

  if (errors.length > 0) {
    return res.status(400).json({ error: errors, code: "INVALID_INPUT" });
  }

  try {
    if (password !== rePass) {
      return res.status(401).json({ error: "Passwords do not match.", code: "PASSWORD_MISMATCH" });
    }

    const user = await userModel.exists({ email });

    if (user) {
      return res.status(409).json({ error: "Email is already registered.", code: "EMAIL_CONFLICT" });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({ email, password: hashedPass });

    const token = await tokenCreator(newUser);

    const data = {
      _id: newUser._id,
      email: newUser.email,
      admin: newUser.admin,
    };
    res.cookie("token", data, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json(data);
  } catch (error) {
    errorHandler(error, res, req);
  }
});

userController.post("/logout", (req, res) => {
  if (req.cookies.token) {
    res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "strict" });
    res.status(200).json({ message: "Logout successful.", code: "LOGOUT_SUCCESS" });
  } else {
    res.status(401).json({ error: "Invalid or missing token!", code: "INVALID_TOKEN" });
  }
});

module.exports = userController;
