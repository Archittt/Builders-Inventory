const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "your_super_secret_key"; // Keep this in .env ideally
const propertyRoutes = require("./routes/propertyRoutes");


const app = express();

app.use(cors()); // Allow all origins for now

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection using Mongoose
// const uri = "cloudMongoDB";
// "mongodb://localhost:27017"
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
  
  
  
app.post("/api/login", (req, res) => {
  console.log("Login attempt received:", req.body); // Log the received data
  const { username, password } = req.body;

  if (username === "admin" && password === "admin") {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "180d" });
    console.log("JWT Token generated:", token); // Log the generated token
    return res.json({ token });
  }

  return res.status(401).json({ error: "Invalid credentials" });
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
  console.log(`Server running on https://localhost:${PORT}`)
);
