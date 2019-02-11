var express = require('express');
var app = express();
var User = require('../models/user');


app.get('/', (req, res) => {
    debugger;
    User.find({ },'id name courses')
        .exec( 
            (err, users) =>{
                if(err){
                    return res.status(500).json({
                        ok: false,
                        message: 'Error obteniendo usuarios',
                        errors: err
                    });
                }

                res.status(200).json({
                    ok: true,
                    users: users
                });
            });
});

//Create user complete
app.post('/', (req, res) =>{
    var body = req.body;

    var user = new User({
        id: body.id,
        name: body.name,
        courses: body.courses
    });

    user.save( (err, userSave) =>{
        if(err){
            return res.status(500).json({
                ok: false,
                message: 'Error al crear usuario',
                errors: err
            });
        }
    
        res.status(201).json({
            ok: true,
            user: userSave
        });
    });    
});

module.exports = app;