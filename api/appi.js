'Use strict'

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
//Notificaciones


//cargar Rutas
var user_routes = require('./routes/user');
var ruta_routes = require('./routes/ruta');
var secretaria_routes=require('./routes/secretaria');
var chofer_routes=require('./routes/chofer');
var taxi_routes=require('./routes/taxi');
var message_routes= require('./routes/message');
var messageEnco_routes= require('./routes/messageEnco');
var solicitudViaje_routes = require('./routes/solicitudViaje');
var solicitudEncomienda_routes = require('./routes/solicitudEncomienda');
var Viajelleno_routes=require('./routes/viajelleno');
var email = require('./routes/enviarCorreo');
var paypal =require('./routes/paypal');
var cuentas=require('./routes/cuentas');
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
app.use('/api', ruta_routes);
app.use('/api', secretaria_routes);
app.use('/api', chofer_routes);
app.use('/api', taxi_routes);
app.use('/api', message_routes);
app.use('/api', messageEnco_routes);
app.use('/api',solicitudViaje_routes);
app.use('/api',solicitudEncomienda_routes);
app.use('/api',Viajelleno_routes);
app.use('/api',email);
app.use('/api',cuentas);
//app.use('/api',paypal);

module.exports = app; // hace referencia a la variable de express

