'use strict'

//pago tarjetad e credito
var paypal = require('paypal-rest-sdk');

// coenxion base
var mongoose = require('mongoose');
var app = require('./appi');
var port = process.env.PORT || 3977;

var Viaje = require('./models/viaje');

var Encomienda = require('./models/encomienda');

mongoose.connect('mongodb://localhost:27017/curso_mean2', (err, res) => {
    if (err) {
        throw err;

    } else {
        console.log("base de datos esta corriendo correctamente");

        app.listen(port, function () {
            console.log("servidor del api rest de mucsica ecuchando por el puerto", port);
        });
    }

});

//el socket

var express = require('express');
var appi = express();
var server = require('http').Server(appi);

var io = require('socket.io')(server);
app.use(express.static('client'));
io.set("origins", "*:*");


io.on('connection', function (socket) {
    socket.on('create notification', function (data) {
        socket.broadcast.emit('new notification', data);
    });
});

io.on('connection', function (socket) {
    socket.on('secretaria', function (data) {
        console.log("sockettt" + data.a.sockett);
        io.to(data.a.sockett).emit('cliente', data);
        //socket.broadcast.emit('cliente',data);  // activa esto
    });
});

/// pago con tarjeta

paypal.configure({
    'mode': 'live', //sandbox or live
    'client_id': 'AYjQP_qgxpCAJtdTPoeOFOsVtP__Lop-8y2ngTFLJxuOOSmtuSJg-51icjXM5II52TCAEJ2LxJtIW8cb',
    'client_secret': 'EDi4KpUmoYDjfgKcHc7UrklXalpWZ624twyA5dfwyCZpDVydqduSoh_HO0EbteuRob9sDlzkL8FSIgVI'
});

app.globalAmount = 0;
app.globalTipoPago = '';
app.globalTipoSolicitud = "";
app.post('/api/createPayment', function (req, res) {
    console.log('iudViaje', req.body.idViaje);
    app.globalTipoSolicitud = req.body.pagoDe;
    app.globalId = req.body.idViaje;
    app.globalAmount = req.body.amount;
    var create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://www.appmontecarlotransvip.com:3977/executePayment",
            "cancel_url": "http://www.appmontecarlotransvip.com:3977/cancelPayment"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "item",
                    "sku": "item",
                    "price": Number(req.body.amount)+1.25,
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total":  Number(req.body.amount)+1.25,
            },
            "description": "This is the payment description."
        }]
    };


    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            console.log("Create Payment Response");
            console.log(payment);
            res.send(payment);
        }
    });
});



app.get('/executePayment', function (req, res) {
    var payment_Id = req.query.paymentId;
    var payer_id = req.query.PayerID;
    var execute_payment_json = {
        "payer_id": payer_id,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": '1'//app.globalAmount
            }
        }]
    };

    var paymentId = payment_Id;

    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            console.log("este es tu herror",error.response);
            throw error;
        } else {
            console.log("Get Payment Response");
            console.log(JSON.stringify(payment));
            //res.send("Transaccion Completa");

            if (app.globalTipoSolicitud == "Viaje") {

                Viaje.updateMany({ _id: app.globalId }, { '$set': { tipoPago: "Online" } }, (err, solicitudViajeUpdate) => {

                    if (err) {
                        res.status(500).send({ message: "Error al actualizar Viaje" });

                    } else {
                        if (!solicitudViajeUpdate) {
                            res.status(404).send({ message: "El viaje no se ha pagado" });
                        } else {
                            //console.log(solicitudViajeUpdate);
                            res.status(200).send("transaccion Completa");

                        }
                    }

                });
            }else
            {
                console.log("Entre a actualizar Encomeidna");
                Encomienda.updateMany({ _id: app.globalId }, { '$set': { tipoPago: "Online" } }, (err, solicitudViajeUpdate) => {

                    if (err) {
                        res.status(500).send({ message: "Error al actualizar Viaje" });

                    } else {
                        if (!solicitudViajeUpdate) {
                            res.status(404).send({ message: "El viaje no se ha pagado" });
                        } else {
                            //console.log(solicitudViajeUpdate);
                            res.status(200).send("Transaccion Completa");

                        }
                    }

                });
            }


        }
    });
});

app.get('/cancelPayment', function (req, res) {
    res.send("Trannsaccion cancelada");
});


server.listen(8988, function () {
    console.log('servidor esta funcionando en el puerto 8988');
});