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

const generateCategories = (parentCategories) => {
  const categories = []
  const childCategories = []

  // Generate parent categories
  for (let i = 0; i < parentCategories.length; i++) {
    const category = new Category({
      name: parentCategories[i],
      description: faker.lorem.sentence(),
    })

    categories.push(category)
  }

  // Generate child categories for first 4 parent categories
  for (let i = 0; i < 4; i++) {
    for (let j = 1; j <= 5; j++) {
      const category = new Category({
        name: `Child ${j} of ${parentCategories[i]}`,
        description: faker.lorem.sentence(),
        parentCategoryId: categories[i]._id,
      })

      childCategories.push(category)
    }
  }

  return [...categories, ...childCategories]
}

const parentCategories = [
  'Category 1',
  'Category 2',
  'Category 3',
  'Category 4',
  'Category 5',
]

const categories = generateCategories(parentCategories)

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
