require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const categoryRoutes = require('./routes/category');
const imageRoute = require('./routes/image');

const app = express();

const path = require('path');

const mongoUser = process.env.DB_USER;
const mongoPassword = process.env.DB_PASSWORD;
const myDataBase = 'test';
const url = `mongodb+srv://${mongoUser}:${mongoPassword}@cluster0.zmhsivz.mongodb.net/${myDataBase}?retryWrites=true&w=majority`;
const options =  { useNewUrlParser: true, useUnifiedTopology: true };

mongoose.createConnection(url, options, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`Connecté à ${myDataBase}!`);
  }
});

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.get('/', (req, res, next) => {
  res.json({name: "toto"});
  next();
});  
  
app.use('/api/stuff', stuffRoutes);

app.use('/api/auth', userRoutes);

app.use('/api/product', productRoutes);

app.use('/api/category', categoryRoutes);

app.use('/api/image', imageRoute);

app.use('/images', express.static(path.join(__dirname, 'images')));
  
module.exports = app;