require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/product');
const Category = require('../models/category');
const { faker } = require('@faker-js/faker');

const mongoUser = process.env.DB_USER;
const mongoPassword = process.env.DB_PASSWORD;

mongoose.connect('mongodb+srv://'+mongoUser+':'+mongoPassword+'@cluster0.zmhsivz.mongodb.net/?retryWrites=true&w=majority',
{ useNewUrlParser: true,
  useUnifiedTopology: true });

async function seed() {
    try {
      // Get all categories from the database
      const categories = await Category.find({});
  
      // If there are no categories, create some default ones
      if (categories.length === 0) {
        const defaultCategories = [
          { name: 'Electronics', description: 'Electronic devices and accessories' },
          { name: 'Clothing', description: 'Clothing and apparel' },
          { name: 'Books', description: 'Books and literature' }
        ];
        await Category.insertMany(defaultCategories);
        console.log('Default categories added successfully');
      }
  
      // Get all categories again, in case default categories were just added
      const allCategories = await Category.find({});
  
      // Create an array to hold all the products
      const products = [];
  
      // Generate 100 products
      for (let i = 0; i < 100; i++) {
        // Get a random category for the product
        const categoryIndex = Math.floor(Math.random() * allCategories.length);
        const categoryId = allCategories[categoryIndex]._id;
  
        // Generate a random price for the product
        const price = Math.floor(Math.random() * 1000) + 1;
  
        // Generate a random number to determine if the product is in stock
        const inStock = Math.random() >= 0.5;
  
        // Generate a random image URL for the product
        const avatarUrl = faker.image.imageUrl();
  
        // Create the product object and add it to the array
        const product = new Product({
          name: faker.commerce.productName(),
          description: faker.lorem.sentence(),
          price,
          inStock,
          avatarUrl,
          categoryId,
          images: [faker.image.imageUrl(), faker.image.imageUrl(), faker.image.imageUrl()]
        });
        products.push(product);
      }
  
      // Insert all the products into the database
      await Product.insertMany(products);
  
      console.log('Products added successfully');
    } catch (error) {
      console.log(error);
    } finally {
      mongoose.connection.close();
    }
  }
  
  seed();
  