const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order");

//Get all orders
router.get("/", orderController.getAllOrders);

//Get  a single order
router.get("/:id", orderController.getOrderById);

//Create a new order
router.post("/", orderController.createOrder);

//Update a order
router.put("/:id", orderController.updateOrder);

//Delete a order
router.delete("/:id", orderController.deleteOrder);

module.exports = router;
