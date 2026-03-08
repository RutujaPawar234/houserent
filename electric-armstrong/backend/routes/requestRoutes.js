const express = require('express');
const { sendRequest, getOwnerRequests, getTenantRequests, updateRequestStatus } = require('../controllers/requestController');
const { protect, owner } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, sendRequest);
router.get('/owner', protect, owner, getOwnerRequests);
router.get('/tenant', protect, getTenantRequests);
router.put('/:id', protect, owner, updateRequestStatus);

module.exports = router;
