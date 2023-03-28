const Product = require('../models/product')

exports.createProduct = (req, res, next) => {
  const product = new Product({ ...req.body })

  product
    .save()
    .then((product) => res.status(201).json({ product }))
    .catch((error) => res.status(400).json({ error }))
}

exports.getAllProducts = (req, res, next) => {
  Product.find()
    .then((products) => res.status(200).json({ products }))
    .catch((error) => res.status(400).json({ error }))
}

exports.getOneProduct = (req, res, next) => {
  Product.findOne({ _id: req.params.id })
    .then((product) => res.status(200).json({ product }))
    .catch((error) => res.status(400).json({ error }))
}

exports.modifyProduct = (req, res, next) => {
  const productObject = req.file
    ? {
        ...JSON.parse(req.body.product),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body }

  Product.updateOne(
    { _id: req.params.id },
    { ...productObject, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: 'Modified!' }))
    .catch((error) => res.status(400).json({ error }))
}

exports.deleteProduct = (req, res, next) => {
  Product.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Deleted!' }))
    .catch((error) => res.status(400).json({ error }))
}

exports.getProductsByCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params

    // Recherche de toutes les sous-catégories
    const childCategories = await Category.find({
      categoryId: categoryId,
    }).select('_id')

    // Concaténation de la catégorie parente et des sous-catégories en un seul tableau
    const allCategories = [categoryId, ...childCategories.map((c) => c._id)]

    // Recherche de tous les produits correspondant à toutes les catégories
    const products = await Product.find({ categoryId: { $in: allCategories } })

    res.status(200).json({ products })
  } catch (error) {
    res.status(400).json({ error })
  }
}
