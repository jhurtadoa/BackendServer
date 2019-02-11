var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var annotationSchema = new Schema({
        iduser:{ type:String, unique: false, required: [true, 'El id del usuario es requerido']},
        idcourse:{ type:String, unique: false, required: [true, 'El id del curso es requerido']},
        idtopic:{ type:String, unique: false, required: [true, 'El id del tema es requerido']},
        type: { type:String, unique: false, required: [true, 'El tipo de anotación es requerido']},
        description: { type:String, unique: false, required: [true, 'La descripción de la anotación es requerida']},
        context: { type:String, unique: false, required: [true, 'El contexto de la anotación es requerido']},
        stars: { type:String, unique: false, required: [true, 'La valoración de la anotación es requerida']},
        answers: [
                {
                        iduser: { type:String, unique: false, required: [true, 'La descripción de la respuesta es requerida']},
                        description: { type:String, unique: false, required: [true, 'La descripción de la respuesta es requerida']},
                        datetimecreated: { type:Date, unique: false, required: [true, 'La fecha de creación de la respuesta es requerida']}
                }
        ]
});

module.exports  = mongoose.model('Annotation', annotationSchema);