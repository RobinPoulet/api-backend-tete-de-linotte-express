const Category = require('../models/category');

exports.createCategory = (req, res, next) => {
    console.log(req.body);
    const category = new Category(
        {...req.body}
    );
    category.save()
        .then((category) => res.status(201).json({ category }))
        .catch(error => res.status(400).json({ error }));
}

exports.getAllCategories = (req, res, next) => {
    Category.find()
        .then(categories => res.status(200).json({ categories }))
        .catch(error => res.status(400).json({ error }));
}

exports.getOneCategory = (req, res, next) => {
    Category.findOne({ _id: req.params.id })
        .then(category => res.status(200).json({ category }))
        .catch(error => res.status(400).json({ error }));
}

exports.modifyCategory = (req, res, next) => {
    const categoryObject = {...req.body}

    Category
        .updateOne({ _id: req.params.id }, { ...categoryObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Modified!' }))
        .catch(error => res.status(400).json({ error }));
}

exports.deleteCategory = (req, res, next) => {
    Category.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Deleted!' }))
        .catch(error => res.status(400).json({ error }));    
}