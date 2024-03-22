const priceController = require("express").Router();
// const priceModel = require("../models/Price");

const asd = require("../models/Price");

const errorHandler = require("../utils/errorHandler");
const { isAuthorized } = require("../middlewares/guards");

priceController.post("/createPrice", async (req, res) => {
  console.log(req.user);
  try {
    const { safariTag, period, rates } = req.body;
    // console.log(safariTag, period, rates);
    // if (!period || !rates || !safariTag) {
    //   return res.status(400).send({ message: "Missing required fields" });
    // }

    const newPrice = await asd.create({
      safariTag,
      period,
      rates,
    });

    // console.log("here");
    // res.status(201).json(newPrice);

    // res.status(201).json(newPrice._id);
  } catch (error) {
    console.log(error);
    // console.log(error);
    // console.log("asd11111111");
    // console.log(error);
    // res.status(500).json({ message: "Error creating price", error: error.message });
    // errorHandler(error);
  }
});

module.exports = priceController;
