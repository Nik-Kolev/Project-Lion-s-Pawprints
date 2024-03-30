const safariController = require("express").Router();
const safariModel = require("../models/Safari");
const errorHandler = require("../utils/errorHandler");
const { isAuthorized } = require("../middlewares/guards");

safariController.post("/createSafari", isAuthorized, async (req, res) => {
  try {
    const { safariTitle, safariImage, days, period, rates } = req.body;
    const newSafari = await safariModel.create({ owner: req.user._id, safariTitle, safariImage, days, period, rates });
    res.status(201).send(newSafari);
  } catch (error) {
    res.status(500).send({ message: "Error creating safari", error: error.message });
    errorHandler(error);
  }
});

safariController.post("/updateSafari/:id", isAuthorized, async (req, res) => {
  try {
    const { id } = req.params;
    const { safariTitle, safariImage, days, period, rates } = req.body;

    const currentSafari = await safariModel.findById(id);
    const newDays = days.map((day, index) => {
      if (day.dayImage === "") {
        day.dayImage = currentSafari.days[index].dayImage;
      }
      return day;
    });
    const updatedSafari = await safariModel.findByIdAndUpdate({ _id: id }, { safariTitle, safariImage, days: newDays, period, rates }, { new: true });
    res.status(201).send(updatedSafari);
  } catch (error) {
    res.status(500).send({ message: "Error creating safari", error: error.message });
    errorHandler(error);
  }
});

safariController.get("/fetchCatalogSafaris", async (req, res) => {
  try {
    const safaris = await safariModel.find();

    setTimeout(() => {
      res.status(200).send(safaris);
    }, 1000);
  } catch (error) {
    res.status(500).send("error fetching safaris");
    errorHandler(error);
  }
});

safariController.get("/fetchSafariById/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const safari = await safariModel.findOne({ _id: id });
    res.status(200).send(safari);
  } catch (error) {
    res.status(500).send(`error fetching safari with id: ${id}`);
    errorHandler(error);
  }
});

module.exports = safariController;
