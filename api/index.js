'use strict'

var bcrypt = require('bcrypt-nodejs');
var moment = require('moment');
var Viaje = require('./models/viaje');
var paypal = require('paypal-rest-sdk');


// coenxion base
var mongoose = require('mongoose');
var app = require('./appi');
var port = process.env.PORT || 3977;



mongoose.connect('mongodb://198.211.115.148:27017/puppydb',{user: 'nutch@', pass: 'p@ssw0rd'}, (err, res) => {
    if (err) {
        throw err;
    } else {
        console.log("base de datos esta corriendo correctamente");
        app.listen(port, function () {
            console.log("servidor del api rest de mucsica ecuchando por el puerto", port);
        });
    }
});




paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AUXffM6g1diCdvcCHEj3xdu80ipGX7EMnbfaEJ-uYG1wg-iaUhONBS17YB6CoICLJgy5Qi2r-BFlPx3U',
    'client_secret': 'ECZytw30fCOqtK3XOUfpxl-v_W3sebxxiliqxachxSMzgmroQxqe_4Nugdxp-CfVsgEQgxVDNVlYtWlR'
});

app.globalAmount = 0;
app.globalTipoPago = '';
app.globalTipoSolicitud = "";
app.post('/api/createPayment', function (req, res) {
    console.log('iudViaje', req.body);
    app.globalTipoSolicitud = req.body.pagoDe;
    app.globalId = req.body.idViaje;
    app.globalAmount = (Number(req.body.amount)+1.25);
    var create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://www.dogipaseoscaninos.com:3977/executePayment",
            "cancel_url": "http://www.dogipaseoscaninos.com:3977/cancelPayment"
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
                "total": app.globalAmount //'1'
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
                            res.status(200).send("Transaccion Completa vuelve a la app");

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







