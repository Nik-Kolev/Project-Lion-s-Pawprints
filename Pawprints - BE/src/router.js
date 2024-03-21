const router = require("express").Router();

const userController = require("./controllers/userController");
const priceController = require("./controllers/priceController");
const routeController = require("./controllers/routeController");
const safariController = require("./controllers/safariController");

router.use("/users", userController);
router.use("/price", priceController);
router.use("/route", routeController);
router.use("/safari", safariController);

module.exports = router;
