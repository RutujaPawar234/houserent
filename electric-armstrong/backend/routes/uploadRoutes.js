const express = require('express');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.post('/', upload.array('images', 5), (req, res) => {
    const filePaths = req.files.map(file => `/${file.path.replace(/\\/g, '/')}`);
    res.send(filePaths);
});

module.exports = router;
