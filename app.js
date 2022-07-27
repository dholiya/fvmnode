const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();


const locationRoutes = require('./routes/locationRoutes');
const bidRoutes = require('./routes/bidRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
// const formidable = require('express-formidable');
var bodyParser = require('body-parser')
const path = require('path');
// https://www.youtube.com/watch?v=mbsmsi7l3r4

// express app
const app = express();
var url =  process.env.URL;
 mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3000))
  .catch(err => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// app.use(formidable());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


// app.use((req, res, next) => {
//   res.locals.path = req.path;
//   next();
// });

// routes
// app.get('/', (req, res) => {
//   res.redirect('/user');
// });

// app.get('/about', (req, res) => {
//   res.render('about', { title: 'About' });
// });


app.use('/location', locationRoutes);
app.use('/bid', bidRoutes);
app.use('/user', userRoutes);
app.use('/product', productRoutes);


// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});