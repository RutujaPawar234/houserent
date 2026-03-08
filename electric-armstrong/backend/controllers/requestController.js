const Request = require('../models/requestModel');

// @desc    Send a rental request
// @route   POST /api/requests
// @access  Private/Tenant
const sendRequest = async (req, res) => {
    const { propertyId, message } = req.body;

    const request = new Request({
        tenant: req.user._id,
        property: propertyId,
        message,
    });

    const createdRequest = await request.save();
    res.status(201).json(createdRequest);
};

// @desc    Get rental requests for an owner
// @route   GET /api/requests/owner
// @access  Private/Owner
const getOwnerRequests = async (req, res) => {
    const requests = await Request.find()
        .populate({
            path: 'property',
            match: { owner: req.user._id }
        })
        .populate('tenant', 'name email phone');

    // Filter out requests where property is null (means property doesn't belong to owner)
    const filteredRequests = requests.filter(request => request.property !== null);
    res.json(filteredRequests);
};

// @desc    Get rental requests sent by a tenant
// @route   GET /api/requests/tenant
// @access  Private/Tenant
const getTenantRequests = async (req, res) => {
    const requests = await Request.find({ tenant: req.user._id }).populate('property', 'title price location');
    res.json(requests);
};

// @desc    Update request status (Approve/Reject)
// @route   PUT /api/requests/:id
// @access  Private/Owner
const updateRequestStatus = async (req, res) => {
    const request = await Request.findById(req.params.id).populate('property');

    if (request) {
        if (request.property.owner.toString() !== req.user._id.toString()) {
            res.status(401).json({ message: 'Not authorized to update this request' });
            return;
        }

        request.status = req.body.status || request.status;
        const updatedRequest = await request.save();
        res.json(updatedRequest);
    } else {
        res.status(404).json({ message: 'Request not found' });
    }
};

module.exports = { sendRequest, getOwnerRequests, getTenantRequests, updateRequestStatus };
