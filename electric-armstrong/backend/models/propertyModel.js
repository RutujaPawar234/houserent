const mongoose = require('mongoose');

const propertySchema = mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    propertyType: { type: String, enum: ['Apartment', 'Villa', 'Independent House', 'PG'], required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    area: { type: Number, required: true },
    amenities: [String],
    images: [String],
}, { timestamps: true });

const Property = mongoose.model('Property', propertySchema);
module.exports = Property;
