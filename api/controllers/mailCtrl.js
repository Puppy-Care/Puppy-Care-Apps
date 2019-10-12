'use strict'
var bcrypt = require('bcrypt-nodejs');
var nodemailer = require('nodemailer');
var Chofer = require('../models/chofer');
// email sender function
exports.sendEmail = function (req, res) {
    console.log("MI INFORMACION >>>>>>>>>>>>>", req.body.obj);
    // Definimos el transporter
    // console.log(req.b);
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'notificationspatitas@gmail.com',
            pass: 'Patitas123'
        }
    });
    // Definimos el email

    //PONER AQUI EL IF
   

    if (req.body.variable == 'AV') {
        var idChofer = req.body.obj._id_chofer;

        console.log('asignar viaje >>>>>>', req.body.obj);

        Chofer.findOne({
            _id: idChofer
        }, (err, user) => {
            if (err) {
                res.status(500).send({
                    message: "Error al verificar sus permisos para esta operación"
                });
            } else {
                if (!user) {
                    return res.status(500).send({
                        message: "No tienes permiso para actualizar a un Chofer"
                    });
                } else {
                    console.log("El CHofer", user);
                    var mailOptions = {
                        from: 'notificationspatitas@gmail.com',
                        to: user.correo + ',' + req.body.obj.receiver.correo,//req.body.obj._id_chofer.correo,
                        subject: 'Tienes nuevas notificaciones en tu APP MONTECARLO',
                        text: 'NUEVO PASEO: El viaje del cliente ' + req.body.obj.receiver.nombre + ' ' + req.body.obj.receiver.apellido + ' en la fecha ' + req.body.obj.fechaSalida + ' Hora de recogida ' + req.body.obj.horarioR + ' Hora de entrega ' + req.body.obj.horarioE + ' ha sido asignada, por favor para mas información revisa tu aplicación móvil.'
                    };
                    transporter.sendMail(mailOptions, function (error) {
                        if (error) {
                            console.log(error);
                            res.send(500, error);
                        } else {
                            console.log("Email sent");
                            res.status(200).jsonp(req.body);
                        }
                    });
                }
            }
        });

    }



    // Enviamos el email

    /*transporter.sendMail(mailOptions, function (error) {
        if (error) {
            console.log(error);
            res.send(500, err.message);
        } else {
            console.log("Email sent");
            res.status(200).jsonp(req.body);
        }
    });*/
};