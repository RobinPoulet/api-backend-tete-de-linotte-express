require('dotenv').config()
const mongoose = require('mongoose')
const Subcategory = require('../models/subcategory')
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

async function* generateSubcategories(categories) {
  for (let i = 0; i < categories.length; i++) {
    const numberOfSubcategories = Math.floor(Math.random() * 4) + 1 // choisit un nombre aléatoire de sous-catégories à ajouter
    const existingSubcategories = await Subcategory.find({
      category: categories[i]._id,
    })
    const subcategories = []
    for (let j = 0; j < numberOfSubcategories; j++) {
      const subcategory = new Subcategory({
        name: faker.commerce.productName(),
        description: faker.lorem.sentence(),
        categoryId: categories[i]._id,
      })
      // Vérifie si la sous-catégorie existe déjà dans la base de données pour cette catégorie
      const existingSubcategory = existingSubcategories.find(
        (sub) => sub.name === subcategory.name
      )
      if (!existingSubcategory) {
        subcategories.push(subcategory)
      }
    }
    yield subcategories
  }
}

mongoose.connection.once('open', async () => {
  const categories = await Category.find()
  const subcategories = []
  for await (const generatedSubcategories of generateSubcategories(
    categories
  )) {
    subcategories.push(...generatedSubcategories)
  }

  Subcategory.insertMany(subcategories)
    .then(() => {
      console.log('Subcategories added successfully')
      mongoose.connection.close()
    })
    .catch((error) => {
      console.log(error)
      mongoose.connection.close()
    })
})
