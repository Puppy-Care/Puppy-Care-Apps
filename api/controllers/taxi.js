'use strcit'
var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt-nodejs');
var Secretaria = require('../models/secretaria');
var Taxi = require('../models/taxi'); //importar el modelo del usuario  o lo que son las clases comunes
var jwt = require('../services/jwt');


function getImageFile(req, res) {
    var imageFile = req.params.imageFile;
    var path_file = './uploads/taxis/' + imageFile;
    //console.log("este es el path" + path_file);
    fs.exists(path_file, function (exists) {
        if (exists) {
            res.sendFile(path.resolve(path_file));
        } else {
            res.status(200).send({ message: 'No existe la imagen' });
        }
    });
}

function uploadImage(req, res) {
    var taxiId = req.params.id;
    var file_name = 'No subido';

    if (req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];
        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];
       // console.log(ext_split);

        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'png') {
            Taxi.findByIdAndUpdate(taxiId, { image: file_name }, (err, userUpdated) => {
                if (!userUpdated) {
                    res.status(404).send({ message: "El usuario no ha podido actualizarseer5" });
                } else {
                    res.status(200).send({ image: file_name, taxi: userUpdated });
                  //  console.log(this.user);
                }
            });
        } else {
            res.status(200).send({ message: 'el formato de archivo no valido ' });
        }
    } else {
        res.status(200).send({ message: 'no has subido niguna imagen' });
    }
}

function saveTaxi(req, res) {
    var taxi = new Taxi();
    var params = req.body; // cuerpo de la peticion post de la direccion http por post
    //console.log(params);

    Taxi.findOne({ '$and':[{estado:'0'},{placa: params.placa }]}, (err, user) => {
        if (err) {
            res.status(500).send({ message: "Error al registrar el auto." });
        } else {
            if (user) {
                return res.status(500).send({ message: "El auto a registrar ya existe." });
            } else {
                taxi.placa = params.placa;
                taxi.numero_regimen = params.numero_regimen;
                taxi.nombre_coop = params.nombre_coop;
                taxi.marca = params.marca;
                taxi.capacidad_pasajeros = params.capacidad_pasajeros;
                taxi.modelo = params.modelo;
                taxi.estado = params.estado;

                // encriptar contrasena y guardar datos
                if (taxi.placa != null && taxi.modelo != null && taxi.marca != null) {
                    //guardar usuario
                    taxi.save((err, userStored) => {
                        if (err) {
                            res.status(500).send({ message: 'Errro al guardar el auto.' });
                        } else {
                            if (!userStored) {
                                res.status(404).send({ message: 'No se ha registrado el  auto.' });
                            } else {
                                res.status(200).send({ taxi: userStored, message: 'El auto se ha registrado correctamente.' });

                            }
                        }

                    });//  save es un metodo de mongoose
                } else {
                    res.status(200).send({ message: 'No se ingresaron los campos requeridos.' });
                }
            }
        }
    });
}

function updateTaxi(req, res) {
    var taxiId = req.params.id;
    // en este caso e sparametro de ruta es decir el id para todo lo demas req.body
    var update = req.body;

    Secretaria.findOne({ _id: req.user.sub }, (err, user) => {
        if (err) {
            res.status(500).send({ message: "Error al actualizar Auto" });

        } else {
            if (!user) {
                return res.status(500).send({ message: "No tienes permiso para actualizar este Auto" });
            }
        }

    });



    Taxi.findByIdAndUpdate(taxiId, update, (err, userUpdate) => {

        if (err) {
            res.status(500).send({ message: "Error al actualizar auto" });

        } else {
            if (!userUpdate) {
                res.status(404).send({ message: "El auto no ha podido actualizarse" });
            } else {
                res.status(200).send({ chofer: userUpdate });
            }
        }

    });
}

function getTaxis(req, res) {
    var busqueda = req.params.busqueda;
    //console.log(busqueda);
    if (!busqueda) {
        res.status(404).send({ message: 'Ingrese un parametro de busqueda' });
    } else {
        var findTaxi = Taxi.find({
            '$and': [{ estado: '0' },
            {
                '$or': [{ placa: new RegExp('^' + busqueda, "i") },
                { numero_regimen: new RegExp('^' + busqueda, "i") }, { nombre_coop: new RegExp('^' + busqueda, "i") },
                { marca: new RegExp('^' + busqueda, "i") }, { modelo: new RegExp('^' + busqueda, "i") },{estado: new RegExp('^' + busqueda, "i") }]
            }]
        },

            (err, taxis) => {
                if (err) {
                    res.status(500).send({ message: "Error al actualizar Auto" });

                } else {
                    if (!taxis) {
                        res.status(404).send({ message: "El Auto no ha podido actualizarse" });
                    } else {
                        res.status(200).send({ taxis });
                    }
                }
            });
    }
}

module.exports = {
    saveTaxi,
    updateTaxi,
    getTaxis,
    uploadImage,
    getImageFile
};