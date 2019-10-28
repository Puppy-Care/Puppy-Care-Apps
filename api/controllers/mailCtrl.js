'use strict'
var bcrypt = require('bcrypt-nodejs');
var nodemailer = require('nodemailer');
var Chofer = require('../models/chofer');
// email sender function
exports.sendEmail = function (req, res) {
    console.log("MI INFORMACION >>>>>>>>>>>>>", req.body);
    // Definimos el transporter
    // console.log(req.b);
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'doginotificaciones@gmail.com',
            pass: 'dogi12345.'
        }
    });
    // Definimos el email

    //PONER AQUI EL IF

    if (req.body.variable == 'CVC') {
        console.log("entre a cancelar chofer",req.body.obj.receiver.correo + ',' + req.body.chofer.correo,)
        var mailOptions = {
            from: 'doginotificaciones@gmail.com',
            to: req.body.obj.receiver.correo + ',' + req.body.chofer.correo,
            
            subject: 'Tienes nuevas notificaciones en tu APP "DOGI',
            text: 'VIAJE CANCELADO POR EL CHOFER: El viaje del cliente ' + req.body.obj.receiver.nombre + ' ' + req.body.obj.receiver.apellido + ' en la fecha ' + req.body.obj.fech_salida + ' Hora de recogida ' + req.body.obj.horarioR + ' Hora de entrega ' + req.body.obj.horarioE + ' ha sido asignada, por favor para mas información revisa tu aplicación móvil.'
        };
        console.log('mailOptions >>>>>> ', mailOptions);
        transporter.sendMail(mailOptions, function (error) {
            if (error) {
                console.log(error);
                res.send(500, err.message);
            } else {
                console.log("Email sent");
                res.status(200).jsonp(req.body);
            }
        });
    }

    if (req.body.variable == 'CVU') {
        var mailOptions = {
            from: 'doginotificaciones@gmail.com',
            to: req.body.obj._id_chofer.correo + ',' + req.body.usuario.correo,
            
            subject: 'Tienes nuevas notificaciones en tu APP "DOGI',
            text: 'PASEO CANCELADO POR EL USUARIO: El viaje del cliente ' + req.body.usuario.nombre + ' ' + req.body.usuario.apellido + ' en la fecha ' + req.body.obj.fech_salida + ' Hora de recogida ' + req.body.obj.horarioR + ' Hora de entrega ' + req.body.obj.horarioE + ' ha sido asignada, por favor para mas información revisa tu aplicación móvil.'
        };
        console.log('mailOptions >>>>>> ', mailOptions);
        transporter.sendMail(mailOptions, function (error) {
            if (error) {
                console.log(error);
                res.send(500, err.message);
            } else {
                console.log("Email sent");
                res.status(200).jsonp(req.body);
            }
        });
    }


    if (req.body.variable == 'CV') {
        var mailOptions = {
            from: 'doginotificaciones@gmail.com',
            to: req.body.obj._id_chofer.correo + ',' + req.body.obj.receiver.correo,
            
            subject: 'Tienes nuevas notificaciones en tu APP "DOGI',
            text: 'PASEO CANCELADO: El viaje del cliente ' + req.body.obj.receiver.nombre + ' ' + req.body.obj.receiver.apellido + ' en la fecha ' + req.body.obj.fech_salida + ' Hora de recogida ' + req.body.obj.horarioR + ' Hora de entrega ' + req.body.obj.horarioE + ' ha sido asignada, por favor para mas información revisa tu aplicación móvil.'
        };
        console.log('mailOptions >>>>>> ', mailOptions);
        transporter.sendMail(mailOptions, function (error) {
            if (error) {
                console.log(error);
                res.send(500, err.message);
            } else {
                console.log("Email sent");
                res.status(200).jsonp(req.body);
            }
        });
    }

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
                        message: "No tienes permiso para actualizar a un paseador"
                    });
                } else {
                    console.log("El CHofer", user);
                    var mailOptions = {
                        from: 'doginotificaciones@gmail.com',
                        to: user.correo + ',' + req.body.obj.receiver.correo,//req.body.obj._id_chofer.correo,
                        subject: 'Tienes nuevas notificaciones en tu APP "DOGI"',
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