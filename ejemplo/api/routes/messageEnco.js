'use strcit'

var express= require('express');
var MessageEncoController = require('../controllers/messageEnco');
var api = express.Router();
var md_auth = require('../middleware/authenticated');


api.get('/probando-md',  MessageEncoController.probando);
api.post('/messageEnco', md_auth.ensureAuth, MessageEncoController.saveMessage);
api.get('/my-messagesEnco', md_auth.ensureAuth, MessageEncoController.getReceivedMessages);
api.get('/my-messagesEncoMio/:_id',md_auth.ensureAuth, MessageEncoController.getReceivedMessagesMios);
api.get('/getReceivedMessagesEncoChofer/:estadoListar',md_auth.ensureAuth, MessageEncoController.getReceivedMessagesEncoChofer);
api.get('/getReceivedMessagesEncoChoferHoy/:estadoListar',md_auth.ensureAuth, MessageEncoController.getReceivedMessagesEncoChoferHoy);
api.put('/updateMessageEncoChofer/:_id',md_auth.ensureAuth, MessageEncoController.updateMessageEncoChofer);
api.put('/updateMessageEncoDenuncia/:_id',md_auth.ensureAuth, MessageEncoController.updateMessageEncoDenuncia);
api.get('/getReceivedMessagesEncoListadoSecretaria/:dia/:mes/:ano', md_auth.ensureAuth, MessageEncoController.getReceivedMessagesEncoListadoSecretaria);
api.put('/updateMessageEncoCancelacion/:_id',md_auth.ensureAuth, MessageEncoController.updateMessageEncoCancelacion);
module.exports = api;