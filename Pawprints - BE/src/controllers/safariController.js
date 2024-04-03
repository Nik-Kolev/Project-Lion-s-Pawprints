const safariController = require("express").Router();
const safariModel = require("../models/Safari");
const errorHandler = require("../utils/errorHandler");
const { isAuthorized } = require("../middlewares/guards");

safariController.post("/createSafari", isAuthorized, async (req, res) => {
  try {
    const { safariTitle, safariImage, days, period, rates } = req.body;
    const newSafari = await safariModel.create({ owner: req.user._id, safariTitle, safariImage, days, period, rates });
    setTimeout(() => {
      res.status(200).send(newSafari);
    }, 1000);
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
    setTimeout(() => {
      res.status(200).send(updatedSafari);
    }, 1000);
  } catch (error) {
    res.status(500).send({ message: "Error creating safari", error: error.message });
    errorHandler(error);
  }
});

safariController.get("/fetchCatalogSafaris", async (req, res) => {
  try {
    let page = Number(req.query.page);
    page < 1 || isNaN(page) ? (page = 1) : page;

    const limit = 12;

    const totalNumberOfSafaris = await safariModel.countDocuments();
    const totalNumberOfPages = Math.ceil(totalNumberOfSafaris / limit);

    page > totalNumberOfPages ? (page = totalNumberOfPages) : page;

    const skip = (page - 1) * limit;

    const safaris = await safariModel.find().limit(limit).skip(skip);
    const data = {
      safaris,
      totalNumberOfPages,
      currentPage: page,
    };
    setTimeout(() => {
      res.status(200).send(data);
    }, 1000);
  } catch (error) {
    res.status(500).send(error);
    errorHandler(error);
  }
});

safariController.get("/fetchSafariById/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const safari = await safariModel.findOne({ _id: id });
    console.log(safari);
    res.status(200).send(safari);
  } catch (error) {
    res.status(500).send(error);
    errorHandler(error);
  }
});

safariController.get("/fetchSafariByRating", async (req, res) => {
  try {
    const safaris = await safariModel.find().sort({ rating: -1 }).limit(5);
    res.status(200).send(safaris);
  } catch (error) {
    res.status(500).send(error);
    errorHandler(error);
  }
});

safariController.delete("/deleteSafari/:id", isAuthorized, async (req, res) => {
  try {
    const { id } = req.params;
    const safari = await safariModel.findByIdAndDelete({ _id: id });
    res.status(200).send(safari);
  } catch (error) {
    res.status(500).send(error);
    errorHandler(error);
  }
});

module.exports = safariController;
