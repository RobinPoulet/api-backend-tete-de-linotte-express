const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    type: { 
        type: String, 
        required: true 
    },
    url: { 
        type: String, 
        required: true 
    },
    model: {
        type: String,
        required: true
    },
    modelId: { 
        type: String,
        required: true,
        unique: true 
    }
})

module.exports = mongoose.model('Image', imageSchema);