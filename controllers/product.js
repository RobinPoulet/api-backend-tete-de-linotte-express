const Product = require('../models/product')
const Category = require('../models/category')

exports.createProduct = async (req, res, next) => {
  const product = new Product({ ...req.body })
  try {
    const product = await product.save()
    res.status(201).json({ product })
  } catch (error) {
    res.status(400).json({ error })
  }
}

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find()
    res.status(200).json({ products })
  } catch (error) {
    res.status(400).json({ error })
  }
}

exports.getOneProduct = async (req, res, next) => {
  try {
    const product = await Product.findOne({ _id: req.params.id })
    res.status(200).json({ product })
  } catch (error) {
    res.status(400).json({ error })
  }
}

exports.modifyProduct = async (req, res, next) => {
  const productObject = req.file
    ? {
        ...JSON.parse(req.body.product),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body }
  try {
    const product = await Product.updateOne(
      { _id: req.params.id },
      { ...productObject, _id: req.params.id }
    )
    res.status(200).json({ product })
  } catch (error) {
    res.status(400).json({ error })
  }
}

exports.deleteProduct = async (req, res, next) => {
  try {
    await Product.deleteOne({ _id: req.params.id })
    res.status(200).json({ message: 'Deleted!' })
  } catch (error) {
    res.status(400).json({ error })
  }
}

exports.getProductsByCategory = async (req, res, next) => {
  try {
    const products = await Product.find({ categoryId: req.params.categoryId })
    res.status(200).json({ products })
  } catch (error) {
    ;(error) => res.status(400).json({ error })
  }
}

exports.getProductsByCategoryAndChildCategory = async (req, res, next) => {
  try {
    const categories = await Category.find({
      categoryId: req.params.categoryId,
    })
    const categoryIds = categories.map((category) => category._id)
    const products = await Product.find({
      $or: [
        { categoryId: req.params.categoryId },
        { categoryId: { $in: categoryIds } },
      ],
    })
    res.status(200).json({ products })
  } catch (error) {
    res.status(400).json({ error })
  }
}
