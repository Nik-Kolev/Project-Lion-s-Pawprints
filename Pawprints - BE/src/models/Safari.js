const mongoose = require("mongoose");

const safariSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  safariTitle: {
    type: String,
  },
  safariImage: {
    type: String,
  },
  days: [
    {
      dayTitle: { type: String },
      descriptions: [{ type: String }],
      mainDestination: { type: String },
      hotelName: { type: String },
      hotelLink: { type: String },
      hotelType: { type: String },
      hotelLocation: { type: String },
      includedMeals: [{ type: String }],
      includedDrinks: [{ type: String }],
      dayImage: { type: String },
    },
  ],
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
  rating: {
    type: String,
  },
});

const Safari = mongoose.model("Safari", safariSchema);

module.exports = Safari;
