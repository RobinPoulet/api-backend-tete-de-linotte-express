const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true 
  },
  inStock: { 
    type: Boolean, 
    required: true 
  },
  avatarUrl: {
    type: String, 
    required: false 
  },
  categoryId: {
    type: String,
    required: true
  },
  imagesUrls: {
    type: Array,
    required: false
  }
});

module.exports = mongoose.model('Product', productSchema);