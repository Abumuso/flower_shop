const db = require("../config/db");

//Get all order
exports.getAllOrders = (req, res) => {
  db.query("SELECT * FROM orders", (error, results) => {
    if (error) {
      console.log("Error retrieving orders:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(results);
  });
};

//Get a single order by ID
exports.getOrderById = (req, res) => {
  const orderId = req.params.id;
  db.query("SELECT * FROM orders WHERE id = ?", [orderId], (error, results) => {
    if (error) {
      console.log("Error retrieving order:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json(results[0]);
  });
};

//Create a new order
exports.createOrder = (req, res) => {
  const { customer_id, flower_id, quantity } = req.body;
  db.query(
    "INSERT INTO orders(customer_id, flower_id, quantity) VALUES (?,?,?)",
    [customer_id, flower_id, quantity],
    (error, results) => {
      if (error) {
        console.log("Error creating order", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      console.log(results);
      res.json({
        message: "Order created successfully",
        orderId: results.insertId,
      });
    }
  );
};

//Update a order
exports.updateOrder = (req, res) => {
  const orderId = req.params.id;
  const { customer_id, flower_id, quantity } = req.body;
  db.query(
    "UPDATE orders SET customer_id = ?, flower_id = ?, quantity = ? WHERE id = ?",
    [customer_id, flower_id, quantity, orderId],
    (error) => {
      if (error) {
        console.log("Error updating order: ", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.json({ message: "Order created successfully" });
    }
  );
};

//Delete a order
exports.deleteOrder = (req, res) => {
  const orderId = req.params.id;
  db.query("DELETE FROM orders WHERE id = ?", [orderId], (error) => {
    if (error) {
      console.log("Error deleting orders:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json({ messsage: "Order deleted successfully" });
  });
};
