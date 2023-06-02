const express = require('express');
const router = express.Router();


const flowerRoutes = require("./flower")
const customerRoutes = require("./customer")

router.use("/flowers", flowerRoutes);
router.use("/customers", customerRoutes);

module.exports = router;