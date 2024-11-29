const mongoose = require('mongoose');

// Define the Property Schema
const propertySchema = new mongoose.Schema({
    sector: String,
    pocket: String,
    siteNo: String,
    size: String,
    demand: String,
    description: String,
    builder: String
});

// Use the default `_id` field provided by Mongoose
const Property = mongoose.model('Property', propertySchema);

module.exports = Property;