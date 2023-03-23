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
  avatarName: {
    type: String,
    required: false
  },
  avatarUrl: {
    type: String, 
    required: false 
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  subCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubCategory',
    required: false
  },
  images: {
    type: Array,
    required: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
