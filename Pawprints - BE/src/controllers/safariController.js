const safariController = require("express").Router();
const safariModel = require("../models/Safari");
const errorHandler = require("../utils/errorHandler");
const { isAuthorized } = require("../middlewares/guards");

safariController.post("/createSafari", async (req, res) => {
  try {
    // const { ownerId, safariTitle, headerImage, description } = req.body;
    const { safariTitle, headerImage, description } = req.body;
    console.log(safariTitle);
    console.log(headerImage);
    console.log(description);
    if (!safariTitle || !headerImage || !description) {
      return res.status(400).send({ message: "Missing required fields" });
    }

    const newSafari = await safariModel.create({
      // ownerId,
      safariTitle,
      headerImage,
      description,
    });

    res.status(201).send({ message: "Safari created successfully", data: { id: newSafari._id } });
  } catch (error) {
    res.status(500).send({ message: "Error creating safari", error: error.message });
    console.log(error);
    errorHandler(error);
  }
});

safariController.post("/updateSafari", async (req, res) => {
  try {
    const { safariId, routeId, priceId } = req.body;
    console.log(safariId, routeId, priceId);
    const asd = await safariModel.findByIdAndUpdate(
      safariId,
      {
        $addToSet: { route: routeId },
        $set: { price: priceId },
      },
      { new: true }
    );
    console.log(asd);
    res.status(201).send({ message: "Safari updated successfully", data: asd });
  } catch (error) {
    res.status(500).send({ message: "Error creating safari", error: error.message });
    console.log(error);
    errorHandler(error);
  }
});

module.exports = safariController;
