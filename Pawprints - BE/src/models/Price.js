const mongoose = require("mongoose");

const pricingSchema = new mongoose.Schema({
  safariTag: {
    type: mongoose.Types.ObjectId,
    ref: "Safari",
  },
  period: {
    from: { type: String },
    to: { type: String },
  },
  rates: {
    twoPeopleOneRoom: { type: String },
    threePeopleTwoRooms: { type: String },
    fourPeopleTwoRooms: { type: String },
    fivePeopleThreeRooms: { type: String },
    sixPeopleThreeRooms: { type: String },
  },
});

const Price = mongoose.model("Price", pricingSchema);

module.exports = Price;
