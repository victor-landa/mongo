const path = require('path');
const morgan = require('morgan');

// Inicializar Express
const express = require ('express');
const app = express();

// importing routes
const indexRoutes = require('./routes/index');

// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname + 'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(morgan('dev'));
// Este método entiende los datos que se le envía desde un formulario HTML
app.use(express.urlencoded())

// routes
app.use('/',indexRoutes);

// Starting the server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});