var express = require('express');
var fileUpload = require('express-fileupload');
var app = express();

app.use(fileUpload());

app.get('/', (req, res) => {
    res.status(200).json({
        ok: true,
        message: 'success'
    });
});

app.post('/:prename', function(req, res) {
    
    let prename = req.params.prename;
    if (!req.files)
      return res.status(400).json({
        ok: false,
        mensaje: 'No se encontró el archivo',
        errors: { message: 'Debe de seleccionar un recurso '}

      });
  
    //obtener nombre del archivo
    let resource = req.files.resource;
    let nombreCortado = resource.name.split('.');
    let extension = nombreCortado[nombreCortado.length - 1];

    let extensionesValidas = ["pdf"];
    if(extensionesValidas.indexOf(extension) < 0){
        return res.status(400).json({
            ok: false,
            mensaje: 'Extension de archivo no valida',
            errors: { 
                message: 'Extensiones validas: '+ extensionesValidas.join(', ')
            }
        });
    }


    
    

    resource.mv(`./uploads/${prename}_`+resource.name, function(err) {
      if (err)
        return res.status(500).json({
            ok: false,
            mensaje: 'Error al almacenar archivo',
            errors: err
        });
  
        return res.status(200).json({
            ok: true,
            mensaje: 'Petición realizada correctamente',
            nombre: resource.name,
            extension: extension
        });
      
    });
  });

module.exports = app;