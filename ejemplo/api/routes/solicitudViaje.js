'use strcit'

var express= require('express');
var SolicitudViajeController = require('../controllers/solicitudViaje');
var api = express.Router();
var md_auth = require('../middleware/authenticated');


api.post('/saveSolicitudViaje', md_auth.ensureAuth,SolicitudViajeController.saveMessageSolicitudViaje);
api.get('/getSolitudesViaje/:estado', md_auth.ensureAuth,SolicitudViajeController.getSolicitudesViaje);
api.get('/getSolitudesViajeMio/:_id', md_auth.ensureAuth,SolicitudViajeController.getSolicitudesViajesMios);
api.put('/update-SolicitudesViajes/:_id',md_auth.ensureAuth,SolicitudViajeController.updateSolicitudViaje);
api.post('/getSolitudesViajeTodas', md_auth.ensureAuth,SolicitudViajeController.getTodasSolicitudesViajes);
api.put('/update-ConjuntosolicitudViaje', md_auth.ensureAuth,SolicitudViajeController.updateConjuntosolicitudViaje);
api.put('/update-MessageCancelacion/:_id', md_auth.ensureAuth,SolicitudViajeController.updateSolicitudViajeCancelacion);


module.exports = api