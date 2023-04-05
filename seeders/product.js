require('dotenv').config()
const mongoose = require('mongoose')
const Product = require('../models/product')
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

async function seed() {
  try {
    // Get all categories from the database
    const categories = await Category.find({})

    // Create an array to hold all the products
    const products = []
    const productNames = []
    // Generate 100 products
    for (let i = 0; i < 100; i++) {
      // Get a random category for the product
      let categoryIndex
      const parentCategory = categories.filter((c) => !c.categoryId)
      const childCategory = categories.filter((c) => c.categoryId)
      if (i < 20) {
        // For the first 20 products, select categories without parents
        categoryIndex = Math.floor(Math.random() * parentCategory.length)
      } else {
        // For the remaining 80 products, select categories with one parent
        categoryIndex = Math.floor(Math.random() * childCategory.length)
      }
      const category =
        i < 20 ? parentCategory[categoryIndex] : childCategory[categoryIndex]
      const categoryId = category._id

      // Generate a random price for the product
      const price = Math.floor(Math.random() * 1000) + 1

      // Generate a random number to determine if the product is in stock
      const inStock = Math.random() >= 0.5

      // Generate a unique avatar URL for the product
      const avatarUrl = faker.image.avatar({ seed: Math.random() * 1000 })

      let productName = faker.commerce.productName(category.name)
      while (productNames.includes(productName)) {
        productName = faker.commerce.productName(category.name)
      }
      productNames.push(productName)
      // Create the product object and add it to the array
      const product = new Product({
        name: productName,
        description: faker.lorem.sentence(),
        price,
        inStock,
        avatarUrl,
        categoryId,
        images: Array.from({ length: 3 }, (_, i) =>
          faker.image.avatar({ seed: Math.random() * (1000 + i) })
        ),
      })
      products.push(product)
    }

    // Insert all the products into the database
    await Product.insertMany(products)

    console.log('Products added successfully')
  } catch (error) {
    console.log(error)
  } finally {
    mongoose.connection.close()
  }
}

seed()
