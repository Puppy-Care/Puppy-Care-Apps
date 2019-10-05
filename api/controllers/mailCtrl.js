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
            user: 'notificacionesmontecarlo@gmail.com',
            pass: 'vano0388'
        }
    });
    // Definimos el email

    //PONER AQUI EL IF
    if (req.body.variable == 'CV') {
        var mailOptions = {
            from: 'notificacionesmontecarlo@gmail.com',
            /* to: req.body.obj._id_chofer.correo,
             to: req.body.obj.receiver.correo,*/
            to: req.body.obj._id_chofer.correo + ',' + req.body.obj.receiver.correo,
            //to: 'avalos.geovanny@hotmail.com, wolfpkmur@gmail.com',
            subject: 'Tienes nuevas notificaciones en tu APP MONTECARLO',
            text: 'VIAJE CANCELADO: El viaje del cliente ' + req.body.obj.receiver.nombre + ' ' + req.body.obj.receiver.apellido + ' en la fecha ' + req.body.obj.fech_salida + ' en el horario ' + req.body.obj.horario + ' de la ruta ' + req.body.obj.ruta + ' ha sido cancelada, por favor para más información revisa tu aplicación móvil.'
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

    if (req.body.variable == 'CE') {
        var mailOptions = {
            from: 'notificacionesmontecarlo@gmail.com',
            to: req.body.obj._id_chofer.correo + ',' + req.body.obj.receiver.correo,
            subject: 'Tienes nuevas notificaciones en tu APP MONTECARLO',
            text: 'ENCOMIENDA CANCELADA: La encomienda del cliente ' + req.body.obj.receiver.nombre + ' ' + req.body.obj.receiver.apellido + ' en la fecha ' + req.body.obj.fech_salida + ' en el horario ' + req.body.obj.horario + ' de la ruta ' + req.body.obj.ruta + ' ha sido cancelada, por favor para mas información revisa tu aplicación móvil.'
        };
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
                        message: "No tienes permiso para actualizar a un Chofer"
                    });
                } else {
                    console.log("El CHofer", user);
                    var mailOptions = {
                        from: 'notificacionesmontecarlo@gmail.com',
                        to: user.correo + ',' + req.body.obj.receiver.correo,//req.body.obj._id_chofer.correo,
                        subject: 'Tienes nuevas notificaciones en tu APP MONTECARLO',
                        text: 'NUEVO VIAJE: El viaje del cliente ' + req.body.obj.receiver.nombre + ' ' + req.body.obj.receiver.apellido + ' en la fecha ' + req.body.obj.fechaSalida + ' en el horario ' + req.body.obj.horario + ' de la ruta ' + req.body.obj.ruta + ' ha sido asignada, por favor para mas información revisa tu aplicación móvil.'
                    };
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
            }
        });

    }

    if (req.body.variable == 'AE') {
        //var idChofer = req.body.obj._id_chofer;

        var idChofer = req.body.obj._id_chofer;


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
                    console.log("El CHofer", user.correo);
                    var mailOptions = {
                        from: 'notificacionesmontecarlo@gmail.com',
                        to: user.correo + ',' + req.body.obj.receiver.correo,//req.body.obj._id_chofer.correo,
                        subject: 'Tienes nuevas notificaciones en tu APP MONTECARLO',
                        text: 'NUEVA ENCOMIENDA: La encomienda del cliente ' + req.body.obj.receiver.nombre + ' ' + req.body.obj.receiver.apellido + ' en la fecha ' + req.body.obj.fechaSalida + ' en el horario ' + req.body.obj.horario + ' de la ruta ' + req.body.obj.ruta + ' ha sido asignada, por favor para mas información revisa tu aplicación móvil.'
                    };
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