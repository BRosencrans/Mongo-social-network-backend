const router = require("express").Router();
const userRoutes = require("./userRoutes");
const echoRoutes = require("./echoRoutes");

router.use("/users", userRoutes);
router.use("/echos", echoRoutes);

module.exports = router;