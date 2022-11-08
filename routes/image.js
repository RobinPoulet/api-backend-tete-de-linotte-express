const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');

const imageCtrl = require('../controllers/image');

router.post('/upload', multer, imageCtrl.uploadImage);

module.exports = router;