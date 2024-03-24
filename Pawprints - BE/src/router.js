const router = require("express").Router();

const userController = require("./controllers/userController");
const safariController = require("./controllers/safariController");

router.use("/users", userController);
router.use("/safari", safariController);

module.exports = router;
