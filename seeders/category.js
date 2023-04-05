require('dotenv').config()
const mongoose = require('mongoose')
const Category = require('../models/category')
const { faker } = require('@faker-js/faker')

const mongoUser = process.env.DB_USER
const mongoPassword = process.env.DB_PASSWORD

mongoose.connect(
  'mongodb+srv://' +
    mongoUser +
    ':' +
    mongoPassword +
    '@cluster0.zmhsivz.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true }
)

const generateCategories = () => {
  const categories = []
  const childCategories = []
  const categoriesNames = []

  // Generate parent categories
  for (let i = 0; i < 5; i++) {
    let categoryParentName = faker.commerce.department()
    while (categoriesNames.includes(categoryParentName)) {
      categoryParentName = faker.commerce.department()
    }
    categoriesNames.push(categoryParentName)
    const category = new Category({
      name: categoryParentName,
      description: faker.lorem.sentence(),
    })
    categories.push(category)
  }
  // Generate child categories for first 3 parent categories
  for (let i = 0; i < 3; i++) {
    for (let j = 1; j <= 3; j++) {
      let categoryChildName = faker.commerce.department()
      while (categoriesNames.includes(categoryChildName)) {
        categoryChildName = faker.commerce.department()
      }
      categoriesNames.push(categoryChildName)
      const category = new Category({
        name: categoryChildName,
        description: faker.lorem.sentence(),
        categoryId: categories[i]._id,
      })

      childCategories.push(category)
    }
  }

  return [...categories, ...childCategories]
}

const categories = generateCategories()

mongoose.connection.once('open', async () => {
  try {
    await Category.insertMany(categories)
    console.log('Categories added successfully')
  } catch (error) {
    console.log(error)
  } finally {
    mongoose.connection.close()
  }
})
