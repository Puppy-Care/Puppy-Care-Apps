'Use strict'

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
//Notificaciones




//cargar Rutas
var user_routes = require('./routes/user');
var chofer_routes=require('./routes/chofer');
var secretaria_routes=require('./routes/secretaria');
var solicitudViaje_routes = require('./routes/solicitudViaje');
var message_routes= require('./routes/message');
var email = require('./routes/enviarCorreo');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); //convertir a json als peticiones

//configurar cabeceras http
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
 
    next();
});

// rutas base
app.use('/api', user_routes);
app.use('/api', chofer_routes);
app.use('/api', secretaria_routes);
app.use('/api',solicitudViaje_routes);
app.use('/api', message_routes);
app.use('/api',email);


module.exports = app; // hace referencia a la variable de express

