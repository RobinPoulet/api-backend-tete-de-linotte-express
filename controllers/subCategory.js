const SubCategory = require('../models/subCategory');

exports.createSubCategory = (req, res, next) => {
    const subCategory = new SubCategory(
        {...req.body}
    );
    subCategory.save()
        .then((subCategory) => res.status(201).json({ subCategory }))
        .catch(error => res.status(400).json({ error }));
}

exports.getAllSubCategories = (req, res, next) => {
    SubCategory.find()
        .then(subCategories => res.status(200).json({ subCategories }))
        .catch(error => res.status(400).json({ error }));
}

exports.getOneSubCategory = (req, res, next) => {
    SubCategory.findOne({ _id: req.params.id })
        .then(subCategory => res.status(200).json({ subCategory }))
        .catch(error => res.status(400).json({ error }));
}

exports.modifySubCategory = (req, res, next) => {
    const subCategoryObject = {...req.body}

    SubCategory
        .updateOne({ _id: req.params.id }, { ...subCategoryObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Modified!' }))
        .catch(error => res.status(400).json({ error }));
}

exports.deleteSubCategory = (req, res, next) => {
    SubCategory.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Deleted!' }))
        .catch(error => res.status(400).json({ error }));    
}