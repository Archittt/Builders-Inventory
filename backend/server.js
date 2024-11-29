const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const propertyRoutes = require("./routes/propertyRoutes");


// Middleware
const app = express();
app.use(express.json()); // To parse JSON body data
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded body data

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/connectToBuilder")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, "../frontend")));

// Use property routes
app.use("/api", propertyRoutes);

// Default route to serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));