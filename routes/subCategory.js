const express = require('express');
const router = express.Router();

const subCategoryCtrl = require('../controllers/subCategory');

router.get('/', subCategoryCtrl.getAllSubCategories);

router.post('/', subCategoryCtrl.createSubCategory);

router.get('/:id', subCategoryCtrl.getOneSubCategory);

router.put('/:id', subCategoryCtrl.modifySubCategory);

router.delete('/:id', subCategoryCtrl.deleteSubCategory);

module.exports = router;