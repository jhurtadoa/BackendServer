var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    id : { type:String, unique: true, required: [true, 'El id es requerido']},
    name : { type:String, required: [true, 'El nombre es requerido']},
    role: {type:String, required:true,default:'Student'},
    courses: [
        {
            id: { type:String, unique: true, required: [true, 'El id del curso es requerido']},
            name: { type:String, unique: true, required: [true, 'El nombre del curso es requerido']},
            topics: [ 
                {
                    id: { type:String, unique: true, required: [true, 'El id del tema es requerido']},
                    nombre: { type:String, unique: true, required: [true, 'El nombre del tema es requerido']},
                    idgrupo: { type:String, unique: true, required: [true, 'El id del grupo para el tema es requerido']},
                    notes: [
                        {
                            type: { type:String, unique: false, required: [true, 'El tipo de anotación es requerido']},
                            description: { type:String, unique: false, required: [true, 'La descripción de la anotación es requerida']},
                            context: { type:String, unique: false, required: [true, 'El contexto de la anotación es requerido']},
                            stars: { type:String, unique: false, required: [true, 'La valoración de la anotación es requerida']}
                        }
                    ],
                    resources: [
                        {
                            id: { type:String, unique: true, required: [true, 'El id del recurso es requerido']},
                            name: { type:String, unique: true, required: [true, 'El nombre del recurso es requerido']},
                            url: { type:String, unique: true, required: [false, 'La url del recurso es requerida']},
                            bytes: { type:String, unique: true, required: [false, 'Los bytes del recurso son requeridos']},
                            description: { type:String, unique: true, required: [true, 'La descripción del recurso es requerida']},
                            context: { type:String, unique: true, required: [true, 'El contexto es requerido']}
                        }
                    ]
                }
            ]
        }
    ]
});

module.exports  = mongoose.model('User', userSchema);