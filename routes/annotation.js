var express = require('express');
var app = express();
var Annotation = require('../models/annotation');


app.get('/:iduser/:idcourse/:idtopic', (req, res) => {
    let params = req.params;
    Annotation.find({   iduser:     params.iduser, 
                        idcourse:   params.idcourse,
                        idtopic:    params.idtopic
                    })
        .exec( 
            (err, annotations) =>{
                if(err){
                    return res.status(500).json({
                        ok: false,
                        message: 'Error obteniendo anotaciones',
                        errors: err
                    });
                }

                res.status(200).json({
                    ok: true,
                    annotations: annotations
                });
            });
});

//Create annotation complete
app.post('/', (req, res) =>{
    var body = req.body;
    var annotation = new Annotation({
        iduser: body.iduser,
        idcourse: body.idcourse,
        idtopic: body.idtopic,
        type: body.type,
        description: body.description,
        context: body.context,
        stars: 0
    });

    annotation.save( (err, annotationSave) =>{
        if(err){
            return res.status(500).json({
                ok: false,
                message: 'Error al crear anotación',
                errors: err
            });
        }
    
        res.status(200).json({
            ok: true,
            annotation: annotationSave
        });
    });    
});




//Update annotation complete
app.put('/', (req, res) =>{
    
    let annotation = new Annotation(req.body);

    Annotation.findByIdAndUpdate(annotation._id, annotation, (err, annotationUpdate) => {
        if(err){
            return res.status(500).json({
                ok: false,
                message: 'Error al buscar anotación',
                errors: err
            });
        }

        if(!annotationUpdate){
            return res.status(400).json({
                ok: false,
                message: 'La anotación con el id '+ body._id + ' no existe',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            annotation: annotationUpdate
        });
    });
});

//Delete annotation complete
app.delete('/:id', (req, res) =>{
    
    var id = req.params.id;
    console.log(id, 'delete server');
    var body = req.body;

    Annotation.findByIdAndRemove(id, (err, annotation) => {
        if(err){
            return res.status(500).json({
                ok: false,
                message: 'Error al buscar anotación',
                errors: err
            });
        }

        if(!annotation){
            return res.status(400).json({
                ok: false,
                message: 'La anotación con el id '+ id + ' no existe',
                errors: err
            });
        }

        
        
        res.status(200).json({
            ok: true,
            annotation: annotation
        });
            
    });
});



module.exports = app;