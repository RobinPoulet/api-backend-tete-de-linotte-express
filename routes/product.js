const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const productCtrl = require('../controllers/product');

router.get('/', auth, productCtrl.getAllProducts);

router.post('/', multer, productCtrl.createProduct);

router.get('/:id', auth, productCtrl.getOneProduct);

router.put('/:id', auth, multer, productCtrl.modifyProduct);

router.delete('/:id', auth, productCtrl.deleteProduct);


module.exports = router;

