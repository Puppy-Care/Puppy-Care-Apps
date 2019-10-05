'use stric'


var express = require('express');
var ViajellenoController= require('../controllers/viajelleno');
var md_auth = require('../middleware/authenticated');

var api = express.Router();

api.post('/saveViajelleno',md_auth.ensureAuth,ViajellenoController.saveViajeLleno);
api.get('/getViajesllenos',md_auth.ensureAuth,ViajellenoController.getViajesllenos);
api.get('/dropViajeLleno/:_id',md_auth.ensureAuth, ViajellenoController.dropViajeLleno);
module.exports =api;


