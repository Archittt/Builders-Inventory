const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const propertyRoutes = require("./routes/propertyRoutes");

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection using Mongoose
const uri = "yourmongodburl";
//"mongodb://localhost:27017"
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000, // Set timeout for server selection
  })
  .then(() => {
    console.log("Connected to MongoDB using Mongoose!");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Property routes
app.use("/api", propertyRoutes);

// Serve static files
app.use(express.static(path.join(__dirname, "../frontend")));

// Default route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/mainPage.html"));
});

// Simulate server start
app.post("/api/start-server", (req, res) => {
  console.log("Server started (simulated)");
  res.status(200).send("Server started");
});

// Start server
const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
