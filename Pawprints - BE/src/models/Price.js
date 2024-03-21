const mongoose = require("mongoose");

const pricingSchema = new mongoose.Schema({
  safariTag: {
    type: mongoose.Types.ObjectId,
    ref: "Safari",
    required: true,
  },
  period: {
    type: String,
  },
  rates: {
    twoPeopleOneRoom: {
      price: {
        type: Number,
        required: true,
      },
    },
    threePeopleTwoRooms: {
      price: {
        type: Number,
        required: true,
      },
    },
    fourPeopleTwoRooms: {
      price: {
        type: Number,
        required: true,
      },
    },
    fivePeopleThreeRooms: {
      price: {
        type: Number,
        required: true,
      },
    },
    sixPeopleThreeRooms: {
      price: {
        type: Number,
        required: true,
      },
    },
  },
});

const Price = mongoose.model("Price", pricingSchema);

module.exports = Price;
