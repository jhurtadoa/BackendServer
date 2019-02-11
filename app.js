var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Import Routes
var appRoutes = require('./routes/app');
var userRoutes = require('./routes/user');
var annotationRoutes = require('./routes/annotation');
var uploadRoutes = require('./routes/upload');

var app = express();

//Config CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
  });


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Conexion base de datos
mongoose.connection.openUri('mongodb://localhost:27017/EducacionDistanciaDB', (err, res) => {
    if(err) throw err;

    console.log('Database is: \x1b[32m%s\x1b[0m', 'online');

});

app.use('/upload', uploadRoutes);
app.use('/annotation', annotationRoutes);
app.use('/user', userRoutes);
app.use('/', appRoutes);

app.listen(3000, () => {
    console.log('Express server port 3000: \x1b[32m%s\x1b[0m', 'online');
});