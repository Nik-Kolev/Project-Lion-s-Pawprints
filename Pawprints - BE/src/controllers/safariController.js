const safariController = require("express").Router();
const safariModel = require("../models/Safari");
const errorHandler = require("../utils/errorHandler");
const { isAuthorized } = require("../middlewares/guards");

safariController.post("/createSafari", isAuthorized, async (req, res) => {
  try {
    const { safariTitle, images, days, period, rates } = req.body;

    const newSafari = await safariModel.create({ owner: req.user._id, safariTitle, images, days, period, rates });

    res.status(201).send(newSafari);
  } catch (error) {
    res.status(500).send({ message: "Error creating safari", error: error.message });
    errorHandler(error);
  }
});

safariController.post("/updateSafari", isAuthorized, async (req, res) => {
  try {
    const { safariId, safariTitle, images, days, period, rates } = req.body;
    console.log(req.user._id);
    const updatedSafari = await safariModel.findByIdAndUpdate(
      safariId,
      { safariTitle, images, days, period, rates },
      { new: true }
    );
    res.status(201).send(updatedSafari);
  } catch (error) {
    res.status(500).send({ message: "Error creating safari", error: error.message });
    errorHandler(error);
  }
});

module.exports = safariController;
