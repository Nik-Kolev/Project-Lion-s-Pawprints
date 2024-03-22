const mongoose = require("mongoose");

const safariSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  safariTitle: {
    type: String,
  },
  headerImage: {
    src: {
      type: String,
    },
    alt: {
      type: String,
    },
  },
  route: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Route",
    },
  ],
  price: {
    type: mongoose.Types.ObjectId,
    ref: "Price",
  },
});

const Safari = mongoose.model("Safari", safariSchema);

module.exports = Safari;
