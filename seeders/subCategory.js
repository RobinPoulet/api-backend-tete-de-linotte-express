require('dotenv').config();
const mongoose = require('mongoose');
const Subcategory = require('../models/subcategory');
const Category = require('../models/category');
const { faker } = require('@faker-js/faker');

const mongoUser = process.env.DB_USER;
const mongoPassword = process.env.DB_PASSWORD;

mongoose.connect('mongodb+srv://'+mongoUser+':'+mongoPassword+'@cluster0.zmhsivz.mongodb.net/?retryWrites=true&w=majority',
{ useNewUrlParser: true,
  useUnifiedTopology: true });

Category.find()
  .then(categories => {
    const subcategories = [];
    categories.forEach(category => {
      const numberOfSubcategories = Math.floor(Math.random() * 4) + 1; // choisit un nombre aléatoire de sous-catégories à ajouter
      for (let i = 0; i < numberOfSubcategories; i++) {
        const subcategory = new Subcategory({
          name: faker.commerce.productName(),
          description: faker.lorem.sentence(),
          category: category._id
        });
        subcategories.push(subcategory);
      }
    });

    Subcategory.insertMany(subcategories)
      .then(() => {
        console.log('Subcategories added successfully');
        mongoose.connection.close();
      })
      .catch((error) => {
        console.log(error);
        mongoose.connection.close();
      });
  })
  .catch(error => {
    console.log(error);
    mongoose.connection.close();
  });
