const priceController = require("express").Router();
const priceModel = require("../models/Price");
const errorHandler = require("../utils/errorHandler");
const { isAuthorized } = require("../middlewares/guards");

priceController.post("/createPrice", async (req, res) => {
  try {
    const { safariTag, period, rates } = req.body;

    if (!period || !rates || !safariTag) {
      return res.status(400).send({ message: "Missing required fields" });
    }

    // rates must be in this format to match the schema
    // {
    //   "twoPeopleOneRoom": {
    //     "price": 100
    //   },
    //   "threePeopleTwoRooms": {
    //     "price": 150
    //   },
    //   "fourPeopleTwoRooms": {
    //     "price": 200
    //   },
    //   "fivePeopleThreeRooms": {
    //     "price": 250
    //   },
    //   "sixPeopleThreeRooms": {
    //     "price": 300
    //   }
    // }

    const newPrice = await priceModel.create({
      safariTag,
      period,
      rates,
    });

    res.status(201).send({ message: "Price created successfully", data: newPrice });
  } catch (error) {
    res.status(500).send({ message: "Error creating price", error: error.message });
    console.log(error);
    errorHandler(error);
  }
});

module.exports = priceController;
