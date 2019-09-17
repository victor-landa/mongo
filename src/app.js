const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');

// Inicializar Express
const express = require ('express');
const app = express();

// Conecting to DB
mongoose.connect('mongodb://localhost/crud-mongo')
  .then(db => console.log('DB connected'))
  .catch(err => console.log(err));

// importing routes
const indexRoutes = require('./routes/index');

// settings
app.set('port', process.env.PORT || 3000);
app.set('views', 'src/views');
app.set('view engine', 'ejs');

// middlewares
app.use(morgan('dev'));
// Este método entiende los datos que se le envía desde un formulario HTML
app.use(express.urlencoded({extended: false}));

// routes
app.use('/',indexRoutes);

// Starting the server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});