const routeController = require("express").Router();
const routeModel = require("../models/Route");
const errorHandler = require("../utils/errorHandler");
const { isAuthorized } = require("../middlewares/guards");

routeController.post("/createRoute", async (req, res) => {
  try {
    const { safariTag, day, dayTitle, descriptions, mainDestination, accommodation, mealsAndDrinks, image } = req.body;

    if (
      !safariTag ||
      !day ||
      !dayTitle ||
      !descriptions ||
      !mainDestination ||
      !accommodation ||
      !mealsAndDrinks ||
      !image
    ) {
      return res.status(400).send({ message: "Missing required fields" });
    }

    const newRoute = await routeModel.create({
      safariTag,
      day,
      dayTitle,
      descriptions,
      mainDestination,
      accommodation,
      mealsAndDrinks,
      image,
    });

    res.status(201).send({ message: "Route created successfully", data: newRoute });
  } catch (error) {
    res.status(500).send({ message: "Error creating route", error: error.message });
    console.log(error);
    errorHandler(error);
  }
});

module.exports = routeController;
