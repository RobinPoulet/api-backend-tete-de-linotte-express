require('dotenv').config()
const mongoose = require('mongoose')
const Category = require('../models/category')

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

Category.deleteMany({})
  .then(() => {
    console.log('Categories deleted successfully')
    mongoose.connection.close()
  })
  .catch((error) => {
    console.log(error)
    mongoose.connection.close()
  })
