const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')

const productCtrl = require('../controllers/product')

router.get('/', productCtrl.getAllProducts)

router.post('/', auth, productCtrl.createProduct)

router.get('/:id', productCtrl.getOneProduct)

router.put('/:id', auth, productCtrl.modifyProduct)

router.delete('/:id', auth, productCtrl.deleteProduct)

router.get('/category/:categoryId', productCtrl.getProductsByCategory)

router.get('/subcategory/:subCategoryId', productCtrl.getProductsBySubcategory)

module.exports = router
