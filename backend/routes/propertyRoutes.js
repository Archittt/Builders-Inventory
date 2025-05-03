const express = require("express");
const router = express.Router();
const Property = require("../models/Property");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "your_super_secret_key";

// Middleware to verify JWT
function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(403).json({ error: "Access denied" });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(401).json({ error: "Invalid token" });
    req.user = user;
    next();
  });
}

// All routes below are protected

// Fetch all properties
router.get("/properties", verifyToken, async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ error: "Error fetching properties", details: error.message });
  }
});

// Add a new property
router.post("/add-property", verifyToken, async (req, res) => {
  try {
    const newProperty = new Property(req.body);
    await newProperty.save();
    console.log("Property added successfully!");
    res.status(201).redirect("/");
  } catch (error) {
    console.error("Error adding property:", error);
    res.status(500).send({ error: "Failed to add property. Please try again later." });
  }
});

// Delete a property
router.delete("/delete-property/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProperty = await Property.findByIdAndDelete(id);
    if (deletedProperty) {
      res.json({ message: "Property deleted successfully" });
    } else {
      res.status(404).json({ error: "Property not found" });
    }
  } catch (error) {
    console.error("Error deleting property:", error);
    res.status(500).json({ error: "Failed to delete property", details: error.message });
  }
});

// Get a single property
router.get("/property/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Property.findById(id);
    if (property) {
      res.json(property);
    } else {
      res.status(404).json({ error: "Property not found" });
    }
  } catch (error) {
    console.error("Error fetching property:", error);
    res.status(500).json({ error: "Failed to fetch property", details: error.message });
  }
});

// Update a property
router.put("/update-property/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedProperty = await Property.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (updatedProperty) {
      res.json({ message: "Property updated successfully", updatedProperty });
    } else {
      res.status(404).json({ error: "Property not found" });
    }
  } catch (error) {
    console.error("Error updating property:", error);
    res.status(500).json({ error: "Failed to update property", details: error.message });
  }
});

// Filter properties
router.get("/filter-properties", verifyToken, async (req, res) => {
  try {
    const filters = {};

    if (req.query.sector) filters.sector = req.query.sector;
    if (req.query.pocket) filters.pocket = req.query.pocket;
    if (req.query.size) filters.size = req.query.size;

    if (req.query.builder) {
      // Split the builder query into individual words and use regex to match any word
      const terms = req.query.builder.trim().split(/\s+/);
      filters.builder = { $regex: terms.join("|"), $options: "i" }; // OR-match words, case-insensitive
    }

    const properties = await Property.find(filters);
    res.json(properties);
  } catch (error) {
    console.error("Error filtering properties:", error);
    res.status(500).json({ error: "Server error while filtering properties" });
  }
});


module.exports = router;
