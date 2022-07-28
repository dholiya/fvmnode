const express = require('express');
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
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

// express app
const app = express();

const url =  process.env.URL;
const port =  process.env.PORT ;
const db =  process.env.DB;


mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, dbName: db })
  .then(result => app.listen(port))
  .catch(err => console.log(err));
// register view engine
app.set('view engine', 'ejs');


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


app.use('/api/location', locationRoutes);
app.use('/api/bid', bidRoutes);
app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);


// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});