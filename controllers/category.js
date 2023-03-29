const Category = require('../models/category')

exports.createCategory = async (req, res, next) => {
  const category = new Category({ ...req.body })
  try {
    const category = await category.save()
    res.status(201).json({ category })
  } catch (error) {
    res.status(400).json({ error })
  }
}

exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find()
    res.status(200).json({ categories })
  } catch (error) {
    res.status(400).json({ error })
  }
}

exports.getOneCategory = async (req, res, next) => {
  try {
    const category = await Category.findOne({ _id: req.params.id })
    res.status(200).json({ category })
  } catch (error) {
    res.status(400).json({ error })
  }
}

exports.getChildCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({ categoryId: req.params.id })
    res.status(200).json({ categories })
  } catch (error) {
    res.status(400).json({ error })
  }
}

exports.modifyCategory = async (req, res, next) => {
  const categoryObject = { ...req.body }
  try {
    const category = await Category.updateOne(
      { _id: req.params.id },
      { ...categoryObject, _id: req.params.id }
    )
    res.status(200).json({ category })
  } catch (error) {
    res.status(400).json({ error })
  }
}

exports.deleteCategory = async (req, res, next) => {
  try {
    await Category.deleteOne({ _id: req.params.id })
    res.status(200).json({ message: 'Deleted!' })
  } catch (error) {
    res.status(400).json({ error })
  }
}
