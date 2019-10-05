'use strcit'
var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt-nodejs');

var Chofer = require('../models/chofer'); //importar el modelo del usuario  o lo que son las clases comunes
var Secretaria = require('../models/secretaria');
var jwt = require('../services/jwt');

function getImageFile(req, res) {
    var imageFile = req.params.imageFile;
    var path_file = './uploads/choferes/' + imageFile;
    //console.log("este es el path" + path_file);
    fs.exists(path_file, function (exists) {
        if (exists) {
            res.sendFile(path.resolve(path_file));
        } else {
            res.status(200).send({
                message: 'No existe la imagen'
            });
        }
    });

}

function uploadImage(req, res) {
    var choferId = req.params.id;
    var file_name = 'No se ha subido ninguna Imagen';
    
    if (req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];
        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];
       //console.log(ext_split);
          
        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'png' || file_ext == 'JPG') {
            Chofer.findByIdAndUpdate(choferId, {
                image: file_name
            }, (err, userUpdated) => {
                if (!userUpdated) {
                    res.status(404).send({
                        message: "La foto del Chofer no se actualizado correctamente"
                    });
                } else {

                    res.status(200).send({
                        chofer: userUpdated,
                        image: file_name
                    });

                }
            });
        } else {
            res.status(200).send({
                message: 'El formato de archivo no es valido '
            });
        }


    } else {
        res.status(200).send({
            message: 'No ha subido niguna imagen'
        });
    }

}

function saveChofer(req, res) {
    var chofer = new Chofer();
    var params = req.body; // cuerpo de la peticion post de la direccion http por post
    //console.log(params);

    

    Chofer.findOne({
        '$and': [{estado: '0'}, {'$or':[{cedula: params.cedula}, { correo: params.correo }]}]}, 
        (err, user) => {
        if (err) {
            res.status(500).send({
                message: "Error al ingresar a un nuevo Chofer"
            });

        } else {
            if (user) {
                return res.status(500).send({
                    message: "El Chofer que desea ingresar ya existe"
                });
            } else {
                chofer.cedula = params.cedula;
                chofer.nombre = params.nombre;
                chofer.apellido = params.apellido;
                chofer.correo = params.correo;
                chofer.contrasena = params.contrasena;
                chofer.tel_celular = params.tel_celular;
                chofer.tel_convencional = params.tel_convencional;
                chofer.num_licencia = params.num_licencia;
                chofer.estado = params.estado;


                if (params.contrasena) {

                    // encriptar contrasena y guardar datos
                    bcrypt.hash(params.contrasena, null, null, function (err, hash) {

                        chofer.contrasena = hash;
                        if (chofer.nombre != null && chofer.apellido != null && chofer.correo != null) {
                            //guardar usuario
                            chofer.save((err, userStored) => {
                                if (err) {
                                    res.status(500).send({
                                        message:  "Error al ingresar a un nuevo Chofer"
                                    });
                                } else {
                                    if (!userStored) {
                                        res.status(404).send({
                                            message: 'No se ha registrado correctamente al Chofer'
                                        });
                                    } else {

                                        res.status(200).send({
                                            chofer: userStored,
                                            message: 'El Chofer se ha Registrado Correctamente'
                                        });

                                    }
                                }

                            }); //  save es un metodo de mongoose
                        } else {
                            res.status(200).send({
                                message: 'Introduzca la contraseña'
                            });
                        }
                    });

                } else {
                    res.status(500).send({
                        message: 'Introduzca la contraseña'
                    });
                }
            }
        }

    });


}



function updateChofer(req, res) {
    var choferId = req.params.id;
   var update = req.body;
    
   //console.log("esto es lo que viene mi pecs a ver si viene con contrasena" +JSON.stringify(update));

    Secretaria.findOne({
        _id: req.user.sub
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
            }
        }

    });



    //updadte contrasena
    if (update.estadoContrasena=='1') {
        //  console.log("entre para encriptar",update.estadoContrasena);
        // encriptar contrasena y guardar datos
        hash=true;
        bcrypt.hash(update.contrasena, null, null, function (err, hash) {


            update.contrasena = hash;
           // console.log("contrasena nueva encriptada",update.contrasena);
            update.estadoContrasena=='';

            Chofer.findByIdAndUpdate(choferId, update, (err, userUpdate) => {
        
                if (err) {
                    res.status(500).send({
                        message: "Error al actualizar Chofer"
                    });
        
                } else {
                    if (!userUpdate) {
                        res.status(404).send({
                            message: "El Chofer no ha podido actualizarse"
                        });
                    } else {
                        res.status(200).send({
                            chofer: userUpdate
                        });
                    }
                }
        
            });
          
                        
        });

    }else
    {
        update.estadoContrasena=='';
        
        Chofer.findByIdAndUpdate(choferId, update, (err, userUpdate) => {
        
            if (err) {
                res.status(500).send({
                    message: "Error al actualizar Chofer"
                });
    
            } else {
                if (!userUpdate) {
                    res.status(404).send({
                        message: "El Chofer no ha podido actualizarse"
                    });
                } else {
                    res.status(200).send({
                        chofer: userUpdate
                    });
                }
            }
    
        });
    }
 
    

}


function getChoferes(req, res) {
    var busqueda = req.params.busqueda;
    //console.log(busqueda);
    if (!busqueda) {
        res.status(404).send({
            message: 'Ingrese un parametro de busqueda'
        });
    } else {
        var findChofer = Chofer.find({
            '$and': [{
                estado: '0'
            },

            {
                '$or': [{
                    nombre: new RegExp('^' + busqueda, "i")
                },
                {
                    apellido: new RegExp('^' + busqueda, "i")
                }, {
                    correo: new RegExp('^' + busqueda, "i")
                },
                {
                    cedula: new RegExp('^' + busqueda, "i")
                }, {
                    num_licencia: new RegExp('^' + busqueda, "i")
                }, {
                    estado: new RegExp('^' + busqueda, "i")
                }
                ]
            }
            ]
        },
            (err, choferes) => {
                if (err) {
                    res.status(500).send({
                        message: "Error al obtener Choferes"
                    });

                } else {
                    if (!choferes) {
                        res.status(404).send({
                            message: "No se encuentra resultados de la busqueda"
                        });
                    } else {
                        res.status(200).send({
                            choferes
                        });
                    }
                }
            });
    }
}

function loginChofer(req, res) {
    var params = req.body;
    var correo = params.email;
    var password = params.password;
    //console.log("hola tefo este es el servicio provando el hash Chofer");
    //console.log(params.getHash);


    Chofer.findOne({ '$and': [{ estado: '0' }, { correo: correo }] }, (err, user) => {
        if (err) {
           // console.log("aqui hay un error en la peticion");
            res.status(500).send({
                message: 'Error al Autenticarse'
            });
        } else {
            if (!user) {
                //console.log("error 404 el Chofer no existe");
                res.status(404).send({
                    message: 'El Chofer no existe'
                });
            } else {
                //console.log(user);
                bcrypt.compare(password, user.contrasena, function (err, check) {
                    if (check) {
                       // console.log("vamos a ver que pasa con el hash");
                       // console.log(params.getHash);
                        if (params.getHash) {
                            res.status(200).send({
                                token: jwt.createToken(user)
                            });
                        } else {
                            res.status(200).send({
                                user
                            });
                        }
                    } else {
                        res.status(404).send({
                            message: 'El Chofer no ha podido Autenticarse'
                        });
                    }
                });
            }
        }

    }); //como el where en sql
   // console.log('no encontro');
}


module.exports = {
    saveChofer,
    updateChofer,
    getChoferes,
    uploadImage,
    getImageFile,
    loginChofer
};