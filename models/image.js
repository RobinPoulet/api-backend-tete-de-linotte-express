const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
    name: { 
        type: String, 
        required: false 
    },
    type: { 
        type: String, 
        required: false 
    },
    url: { 
        type: String, 
        required: true,
        unique: true  
    },
    model: {
        type: String,
        required: false
    },
    modelId: { 
        type: String,
        required: false,
        
    }
})

module.exports = mongoose.model('Image', imageSchema);