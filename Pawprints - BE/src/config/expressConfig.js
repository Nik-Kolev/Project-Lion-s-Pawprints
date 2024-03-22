require("dotenv").config();
const express = require("express");
const { port } = require("./config");
const { trimmer } = require("../middlewares/dataTrimmer");
const { authentication } = require("../middlewares/authentication");
const cors = require("cors");
const cookieParser = require("cookie-parser");

module.exports = function expressConfig(app) {
  // app.use(
  //   cors({
  //     origin: "http://localhost:4200",
  //     credentials: true,
  //   })
  // );
  app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, auth");
    res.setHeader("access-control-expose-headers", "Set-Cookie");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
  });
  app.use(cookieParser());
  app.use(express.json());
  app.use(trimmer);
  app.use(authentication);
  app.listen(port, () => console.log(`Server is listening on port ${port}`));
};
