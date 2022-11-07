const express = require('express');
const router = express.Router();

const imageCtrl = require('../controllers/image');

router.post('/upload', imageCtrl.uploadImage);

module.exports = router;