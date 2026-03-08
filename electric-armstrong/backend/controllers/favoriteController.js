const Favorite = require('../models/favoriteModel');

// @desc    Add property to favorites
// @route   POST /api/favorites
// @access  Private/Tenant
const addFavorite = async (req, res) => {
    const { propertyId } = req.body;

    const favoriteExists = await Favorite.findOne({ user: req.user._id, property: propertyId });

    if (favoriteExists) {
        res.status(400).json({ message: 'Property already in favorites' });
        return;
    }

    const favorite = await Favorite.create({
        user: req.user._id,
        property: propertyId,
    });

    res.status(201).json(favorite);
};

// @desc    Get user's favorite properties
// @route   GET /api/favorites
// @access  Private/Tenant
const getFavorites = async (req, res) => {
    const favorites = await Favorite.find({ user: req.user._id }).populate('property');
    res.json(favorites);
};

// @desc    Remove property from favorites
// @route   DELETE /api/favorites/:id
// @access  Private/Tenant
const removeFavorite = async (req, res) => {
    const favorite = await Favorite.findById(req.params.id);

    if (favorite) {
        if (favorite.user.toString() !== req.user._id.toString()) {
            res.status(401).json({ message: 'Not authorized' });
            return;
        }

        await favorite.deleteOne();
        res.json({ message: 'Favorite removed' });
    } else {
        res.status(404).json({ message: 'Favorite not found' });
    }
};

module.exports = { addFavorite, getFavorites, removeFavorite };
