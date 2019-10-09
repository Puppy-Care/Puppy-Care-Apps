'use strcit'

var bcrypt = require('bcrypt-nodejs');

var Secretaria = require('../models/secretaria'); //importar el modelo del usuario  o lo que son las clases comunes
var jwt = require('../services/jwt');



function loginSecretaria(req, res) {
    var params = req.body;

    var correo = params.email;
    var password = params.password;
    //console.log("hola tefo este es el servicio provando el hash",params );

   // console.log(params.getHash);


    Secretaria.findOne({ '$and': [{ estado: '0' }, { correo: correo }] }, (err, secretaria) => {
        if (err) {
           // console.log("aqui hay un error en la peticion");
            res.status(500).send({ message: 'Error en la petición, intente nuevamente.' });
        } else {
            if (!secretaria) {
              //  console.log("error 404 el usuario no existe");
                res.status(404).send({ message: 'El Usuario no existe, comuníquese con nosotros.' });
            } else {
                //console.log(secretaria);
               // console.log('ESTE ES MI PASSWORD DE PRUEBA.........',password);
               // console.log('ESTE ES MI PASSWORD DE PRUEBA.........',secretaria.contrasena);
                bcrypt.compare(password, secretaria.contrasena, function (err, check) {
                   // console.log("vamos a ver que pasa con el hash2222");
                  //  console.log("check", check);
                    if (check) {
                     //   console.log("vamos a ver que pasa con el hash333");
                     //   console.log(params.getHash);
                        if (params.getHash) {
                          //  console.log("crear token");
                            res.status(200).send({ token: jwt.createToken(secretaria) });
                        } else {
                            res.status(200).send({ secretaria });
                        }
                    } else {
                        res.status(404).send({ message: 'Error al ingresar, contraseña incorrecta.' });
                    }
                });


            }
        }

    });  //como el where en sql
   // console.log('no encontro');
}


function saveSecretaria(req, res) {
    var secretaria = new Secretaria();
    var params = req.body; // cuerpo de la peticion post de la direccion http por post
    //console.log(params);

   // console.log(" Entre al save Secretaria", params);

    Secretaria.findOne({ '$and': [{ estado: '0' }, {'$or':[{ cedula: params.cedula },{correo:params.correo}]}] }, (err, user) => {
        if (err) {
            res.status(500).send({ message: "Error con el Usuario Secretaria" });
        } else {
            if (user) {
                return res.status(500).send({ message: "El Usuario Secretaria ya existe" });
            } else {
                secretaria.cedula = params.cedula;
                secretaria.nombre = params.nombre;
                secretaria.apellido = params.apellido;
                secretaria.correo = params.correo;
                secretaria.contrasena = params.contrasena;
                secretaria.tel_celular = params.tel_celular;
                secretaria.tel_convencional = params.tel_convencional;
                secretaria.estado = params.estado;

                if (params.contrasena) {

                    // encriptar contrasena y guardar datos
                    bcrypt.hash(params.contrasena, null, null, function (err, hash) {

                        secretaria.contrasena = hash;
                        if (secretaria.nombre != null && secretaria.apellido != null && secretaria.correo != null) {
                            //guardar usuario
                            secretaria.save((err, userStored) => {
                                if (err) {
                                    res.status(500).send({ message: 'Error al guardadr Secretaria' });
                                } else {
                                    if (!userStored) {
                                        res.status(404).send({ message: 'No se ha registrado a  la  Secretaria' });
                                    } else {
                                        res.status(200).send({ message: 'La Secretaria se ha Registrado Correctamente' });

                                    }
                                }

                            });//  save es un metodo de mongoose
                        } else {
                            res.status(200).send({ message: 'Faltan parametros por llenar' });
                        }
                    });

                } else {
                    res.status(500).send({ message: 'Introduce la contraseña' });
                }


            }

        }

    });



}





function updateSecretaria(req, res) {
    var secretariaId = req.params.id;
    // en este caso e sparametro de ruta es decir el id para todo lo demas req.body
    var update = req.body;


    if (update.estadoContrasena=='1') {
      //  console.log("entre para encriptar",update.contrasena);
      // encriptar contrasena y guardar datos
      hash=true;
      bcrypt.hash(update.contrasena, null, null, function (err, hash) {

        update.contrasena = hash;
      //  console.log("contrasena nueva encriptada",update.contrasena);
        update.estadoContrasena='';

        Secretaria.findByIdAndUpdate(secretariaId, update, (err, userUpdate) => {

            if (err) {
                res.status(500).send({ message: "Error al actualizar Secretaria" });
    
            } else {
                if (!userUpdate) {
                    res.status(404).send({ message: "La Secretaria no ha podido actualizarse" });
                } else {
                    res.status(200).send({ secretaria: userUpdate });
                }
            }
    
        });


      });

    }else
    {
        update.estadoContrasena='';
        Secretaria.findByIdAndUpdate(secretariaId, update, (err, userUpdate) => {

            if (err) {
                res.status(500).send({ message: "Error al actualizar Secretaria" });
    
            } else {
                if (!userUpdate) {
                    res.status(404).send({ message: "La Secretaria no ha podido actualizarse" });
                } else {
                    res.status(200).send({ secretaria: userUpdate });
                }
            }
    
        });
    }


   
}


function getSecretarias(req, res) {
    var busqueda = req.params.busqueda;
   // console.log(busqueda);
    if (!busqueda) {
        res.status(404).send({ message: 'Ingrese un parametro de busqueda' });
    } else {
        var findSecretaria = Secretaria.find({
            '$and': [{ estado: '0' },
            {
                '$or': [{ nombre: new RegExp('^' + busqueda, "i") },
                { apellido: new RegExp('^' + busqueda, "i") }, { correo: new RegExp('^' + busqueda, "i") },
                { cedula: new RegExp('^' + busqueda, "i") }]
            }]
        },



            (err, secretarias) => {
                if (err) {
                    res.status(500).send({ message: "Error al actualizar Secretaria" });

                } else {
                    if (!secretarias) {
                        res.status(404).send({ message: "La Secretaria no ha podido actualizarse" });
                    } else {
                        res.status(200).send({ secretarias });
                       // console.log(secretarias);
                    }
                }
            });


    }
}
module.exports = { // para exportar todas las funcoones 

    saveSecretaria,
    updateSecretaria,
    loginSecretaria,
    getSecretarias
};