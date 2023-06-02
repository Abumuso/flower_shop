const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customer");

//Get all customers
router.get("/", customerController.getAllCustomer);

//Get  a single customer
router.get("/:id", customerController.getCustomerById);

//Create a new customer
router.post("/", customerController.createCustomer);

//Update a customer
router.put("/:id", customerController.updateCustomer);

//Delete a customer
router.delete("/:id", customerController.deleteCustomer);

module.exports = router;