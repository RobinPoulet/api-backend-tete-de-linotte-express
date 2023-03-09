require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('../models/category');
const { faker } = require('@faker-js/faker');

const mongoUser = process.env.DB_USER;
const mongoPassword = process.env.DB_PASSWORD;

mongoose.connect('mongodb+srv://'+mongoUser+':'+mongoPassword+'@cluster0.zmhsivz.mongodb.net/?retryWrites=true&w=majority',
{ useNewUrlParser: true,
  useUnifiedTopology: true });

const categories = [];

for (let i = 0; i < 12; i++) {
  const category = new Category({
    name: faker.commerce.department(),
    description: faker.lorem.sentence(),
  });
  categories.push(category);
}

Category.insertMany(categories)
  .then(() => {
    console.log('Categories added successfully');
    mongoose.connection.close();
  })
  .catch((error) => {
    console.log(error);
    mongoose.connection.close();
  });
