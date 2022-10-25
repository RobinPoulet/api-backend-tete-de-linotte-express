const Image = require('../models/image');

exports.uploadImage = (req, res, next) => {
    const image = new Image({
        url: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        name: req.file.filename,
        type: req.file.mimetype,
        model: req.body.model
    })
    image
        .save()
        .then(() => res.status(201).json({ message: 'Image uploaded!'}))
        .catch(error => res.status(400).json({ error }));
};
