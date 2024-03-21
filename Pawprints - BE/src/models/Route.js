const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema({
  safariTag: {
    type: mongoose.Types.ObjectId,
    ref: "Safari",
    required: true,
  },
  day: { type: String },
  dayTitle: { type: String },
  descriptions: [
    // {
    //   paragraph: { type: String },
    // },
  ],
  mainDestination: { type: String },
  accommodation: [
    {
      name: { type: String },
      type: { type: String },
      location: { type: String },
      link: { type: String },
    },
  ],
  mealsAndDrinks: [
    {
      includedMeals: [],
      drinksIncluded: { type: String },
    },
  ],
  image: [
    {
      src: { type: String },
      alt: { type: String },
    },
  ],
});

const Route = mongoose.model("Route", routeSchema);

module.exports = Route;
