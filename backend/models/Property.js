const mongoose = require("mongoose");

// Define the Property Schema
const propertySchema = new mongoose.Schema({
  sector: String,
  pocket: String,
  siteNo: String,
  size: String,
  demand: String,
  description: String,
  builder: String,
  mobileNo: Number,
});

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
