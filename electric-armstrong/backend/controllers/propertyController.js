const Property = require('../models/propertyModel');

// @desc    Create a new property
// @route   POST /api/properties
// @access  Private/Owner
const createProperty = async (req, res) => {
    const { title, description, price, location, propertyType, bedrooms, bathrooms, area, amenities, images } = req.body;

    const property = new Property({
        owner: req.user._id,
        title,
        description,
        price,
        location,
        propertyType,
        bedrooms,
        bathrooms,
        area,
        amenities,
        images,
    });

    const createdProperty = await property.save();
    res.status(201).json(createdProperty);
};

// @desc    Get all properties with filters
// @route   GET /api/properties
// @access  Public
const getProperties = async (req, res) => {
    const { location, priceMin, priceMax, propertyType, bedrooms } = req.query;

    let query = {};

    if (location) query.location = { $regex: location, $options: 'i' };
    if (propertyType) query.propertyType = propertyType;
    if (bedrooms) query.bedrooms = bedrooms;
    if (priceMin || priceMax) {
        query.price = {};
        if (priceMin) query.price.$gte = Number(priceMin);
        if (priceMax) query.price.$lte = Number(priceMax);
    }

    const properties = await Property.find(query).populate('owner', 'name email phone');
    res.json(properties);
};

// @desc    Get property by ID
// @route   GET /api/properties/:id
// @access  Public
const getPropertyById = async (req, res) => {
    const property = await Property.findById(req.params.id).populate('owner', 'name email phone');

    if (property) {
        res.json(property);
    } else {
        res.status(404).json({ message: 'Property not found' });
    }
};

// @desc    Update a property
// @route   PUT /api/properties/:id
// @access  Private/Owner
const updateProperty = async (req, res) => {
    const property = await Property.findById(req.params.id);

    if (property) {
        if (property.owner.toString() !== req.user._id.toString()) {
            res.status(401).json({ message: 'Not authorized to update this property' });
            return;
        }

        property.title = req.body.title || property.title;
        property.description = req.body.description || property.description;
        property.price = req.body.price || property.price;
        property.location = req.body.location || property.location;
        property.propertyType = req.body.propertyType || property.propertyType;
        property.bedrooms = req.body.bedrooms || property.bedrooms;
        property.bathrooms = req.body.bathrooms || property.bathrooms;
        property.area = req.body.area || property.area;
        property.amenities = req.body.amenities || property.amenities;
        property.images = req.body.images || property.images;

        const updatedProperty = await property.save();
        res.json(updatedProperty);
    } else {
        res.status(404).json({ message: 'Property not found' });
    }
};

// @desc    Delete a property
// @route   DELETE /api/properties/:id
// @access  Private/Owner
const deleteProperty = async (req, res) => {
    const property = await Property.findById(req.params.id);

    if (property) {
        if (property.owner.toString() !== req.user._id.toString()) {
            res.status(401).json({ message: 'Not authorized to delete this property' });
            return;
        }

        await property.deleteOne();
        res.json({ message: 'Property removed' });
    } else {
        res.status(404).json({ message: 'Property not found' });
    }
};

// @desc    Get owner's properties
// @route   GET /api/properties/myproperties
// @access  Private/Owner
const getMyProperties = async (req, res) => {
    const properties = await Property.find({ owner: req.user._id });
    res.json(properties);
};

module.exports = {
    createProperty,
    getProperties,
    getPropertyById,
    updateProperty,
    deleteProperty,
    getMyProperties
};
