var express = require('express');
var mongoose = require('mongoose');



var app = express();



//Conexion base de datos
mongoose.connection.openUri('mongodb://localhost:27017/EducacionDistanciaDB', (err, res) => {
    if(err) throw err;

    console.log('Database is: \x1b[32m%s\x1b[0m', 'online');

});


app.get('/',(req, res) => {
    res.status(200).json({
        ok:true,
        mensaje: 'success'
    });
});

app.listen(3000, () => {
    console.log('Express server port 3000: \x1b[32m%s\x1b[0m', 'online');
});