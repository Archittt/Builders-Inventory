const express = require("express");
const router = express.Router();
const Property = require("../models/Property");

// Fetch all properties
router.get("/properties", async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (error) {
    console.error("Error fetching properties:", error);
    res
      .status(500)
      .json({ error: "Error fetching properties", details: error.message });
  }
});

// Add a new property
router.post("/add-property", async (req, res) => {
  try {
    const newProperty = new Property(req.body);
    await newProperty.save();
    console.log("Property added successfully!");
    res.status(201).redirect("/"); 
  } catch (error) {
    console.error("Error adding property:", error);
    res
      .status(500)
      .send({ error: "Failed to add property. Please try again later." });
  }
});

// Delete a property
router.delete("/delete-property/:id", async (req, res) => {
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
    res
      .status(500)
      .json({ error: "Failed to delete property", details: error.message });
  }
});

// Get a single property
router.get("/property/:id", async (req, res) => {
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
    res
      .status(500)
      .json({ error: "Failed to fetch property", details: error.message });
  }
});

// Update a property
router.put("/update-property/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Only update if we are providing dataa
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
    res
      .status(500)
      .json({ error: "Failed to update property", details: error.message });
  }
});

router.get("/filter-properties", async (req, res) => {
  try {
    const filters = {};
    if (req.query.sector) filters.sector = req.query.sector;
    if (req.query.pocket) filters.pocket = req.query.pocket;
    if (req.query.size) filters.size = req.query.size;
    if (req.query.builder) filters.builder = req.query.builder;

    const properties = await Property.find(filters);
    res.json(properties);
  } catch (error) {
    console.error("Error filtering properties:", error);
    res.status(500).json({ error: "Server error while filtering properties" });
  }
});

module.exports = router;