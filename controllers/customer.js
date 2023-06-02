const db = require("../config/db");

//Get all customer
exports.getAllCustomer = (req, res) => {
  db.query("SELECT * FROM customers", (error, results) => {
    if (error) {
      console.log("Error retrieving customers:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(results);
  });
};

//Get a single customer by ID
exports.getCustomerById = (req, res) => {
  const customerId = req.params.id;
  db.query(
    "SELECT * FROM customers WHERE id = ?",
    [customerId],
    (error, results) => {
      if (error) {
        console.log("Error retrieving customer:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: "Flower not found" });
      }
      res.json(results[0]);
    }
  );
};

//Create a new customer
exports.createCustomer = (req, res) => {
  const { name, email } = req.body;
  db.query(
    "INSERT INTO customers(name, email) VALUES (?,?)",
    [name, email],
    (error, results) => {
      if (error) {
        console.log("Error creating customer", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      console.log(results);
      res.json({
        message: "Customer created successfully",
        customerId: results.insertId,
      });
    }
  );
};

//Update a customer
exports.updateCustomer = (req, res) => {
  const customerId = req.params.id;
  const { name, email } = req.body;
  db.query(
    "UPDATE customers SET name = ?, email = ? WHERE id = ?",
    [name, email, customerId],
    (error) => {
      if (error) {
        console.log("Error updating customer: ", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.json({ message: "Customer created successfully" });
    }
  );
};

//Delete a customer
exports.deleteCustomer = (req, res) => {
  const customerId = req.params.id;
  db.query("DELETE FROM customers WHERE id = ?", [customerId], (error) => {
    if (error) {
      console.log("Error deleting customers:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json({ messsage: "Customer deleted successfully" });
  });
};
