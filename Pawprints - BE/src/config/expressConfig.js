require("dotenv").config();
const express = require("express");
const { port } = require("./config");
const { trimmer } = require("../middlewares/dataTrimmer");
const { authentication } = require("../middlewares/authentication");
const cors = require("cors");
const cookieParser = require("cookie-parser");

module.exports = function expressConfig(app) {
  app.use(
    cors({
      origin: "http://localhost:4200",
      credentials: true,
    })
  );
  app.use(cookieParser());
  app.use(express.json());
  app.use(trimmer);
  app.use(authentication);
  app.listen(port, () => console.log(`Server is listening on port ${port}`));
};
