const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL connection pool
const pool = mysql.createPool({
  host: "localhost",  // your DB host
  user: "root",       // your DB user
  password: "root1234",  // your DB password
  database: "quizdb"
});

// Test DB connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error("MySQL connection error:", err);
    return;
  }
  console.log("Connected to MySQL DB");
  connection.release();
});

// Endpoint to save user details & score
app.post("/api/submit", (req, res) => {
  const { name, phone, email, score } = req.body;

  if (!name || !phone || !email) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const query = "INSERT INTO users (name, phone, email, score) VALUES (?, ?, ?, ?)";

  pool.query(query, [name, phone, email, score || null], (err, results) => {
    if (err) {
      console.error("DB insert error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ message: "User data saved successfully", id: results.insertId });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
