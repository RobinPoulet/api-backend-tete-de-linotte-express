const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const categoryCtrl = require('../controllers/category');

router.get('/', categoryCtrl.getAllCategories);

router.post('/', categoryCtrl.createCategory);

router.get('/:id', categoryCtrl.getOneCategory);

router.put('/:id', categoryCtrl.modifyCategory);

router.delete('/:id', categoryCtrl.deleteCategory);

module.exports = router;