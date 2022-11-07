const Image = require('../models/image');
require('dotenv').config();
const cloudinary = require('cloudinary').v2;

exports.uploadImage = (req, res, next) => {
    console.log(req);
    const image = new Image({
        name: req.file.originalname,
        type: req.file.mimetype,
        model: req.body.model,
        modelId: req.body.modelId,
    });
    cloudinary.uploader
        .upload(req.file.path, {
            ressource_type: 'image',
        })
        .then((result) => {
            console.log("success", JSON.stringify(result, null, 2));
            image.url = result.secure_url;
            
        })
        .catch((error) => {
            console.log("error", JSON.stringify(error, null, 2));
        })
    image
        .save()
        .then(() => res.status(201).json({ message: 'Image uploaded!'}))
        .catch(error => res.status(400).json({ error }));
};
