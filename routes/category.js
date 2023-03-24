const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')

const categoryCtrl = require('../controllers/category')

router.get('/', categoryCtrl.getAllCategories)

router.post('/', auth, categoryCtrl.createCategory)

router.get('/:id', categoryCtrl.getOneCategory)

router.put('/:id', auth, categoryCtrl.modifyCategory)

router.delete('/:id', auth, categoryCtrl.deleteCategory)

module.exports = router
