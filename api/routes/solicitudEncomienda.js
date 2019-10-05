'use strcit'

var express= require('express');
var SolicitudEncomiendaController = require('../controllers/solicitudEncomienda');
var api = express.Router();
var md_auth = require('../middleware/authenticated');


api.post('/saveSolicitudEncomienda',  md_auth.ensureAuth,SolicitudEncomiendaController.saveMessageSolicitudEncomienda);
api.get('/getSolitudesEncomienda/:estado',md_auth.ensureAuth, SolicitudEncomiendaController.getSolicitudesEncomienda);
api.get('/getSolitudesEncomiendaMio/:_id',md_auth.ensureAuth, SolicitudEncomiendaController.getSolicitudesEncomiendasMios);
api.put('/update-SolicitudesEncomiendas/:_id',md_auth.ensureAuth,SolicitudEncomiendaController.updateSolicitudEncomienda);
api.put('/update-SolicitudEncoCancelacion/:_id',md_auth.ensureAuth,SolicitudEncomiendaController.updateSolicitudEncoCancelacion);

module.exports = api
