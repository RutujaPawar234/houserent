const express = require('express');
const {
    createProperty,
    getProperties,
    getPropertyById,
    updateProperty,
    deleteProperty,
    getMyProperties
} = require('../controllers/propertyController');
const { protect, owner } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').get(getProperties).post(protect, owner, createProperty);
router.get('/myproperties', protect, owner, getMyProperties);
router.route('/:id').get(getPropertyById).put(protect, owner, updateProperty).delete(protect, owner, deleteProperty);

module.exports = router;
