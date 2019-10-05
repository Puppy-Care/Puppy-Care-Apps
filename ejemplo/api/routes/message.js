'use strcit'

var express= require('express');
var MessageController = require('../controllers/message');
var api = express.Router();
var md_auth = require('../middleware/authenticated');


api.get('/probando-md',  MessageController.probando);
api.post('/message', md_auth.ensureAuth, MessageController.saveMessage);
api.get('/my-messages', md_auth.ensureAuth, MessageController.getReceivedMessages);
api.get('/my-messagesMio/:_id',md_auth.ensureAuth, MessageController.getReceivedMessagesMios);
api.get('/getReceivedMessagesChofer/:estadoListar',md_auth.ensureAuth, MessageController.getReceivedMessagesChofer);
api.get('/getReceivedMessagesChoferHoy/:estadoListar',md_auth.ensureAuth, MessageController.getReceivedMessagesChoferHoy);
api.put('/updateMessageChofer/:_id',md_auth.ensureAuth, MessageController.updateMessageChofer );
api.put('/updateMessageDenuncia/:_id',md_auth.ensureAuth, MessageController.updateMessageDenuncia );
api.get('/getReceivedMessagesListadoSecretaria/:dia/:mes/:ano', md_auth.ensureAuth, MessageController.getReceivedMessagesListadoSecretaria);
api.put('/updateMessageCancelacion/:_id',md_auth.ensureAuth, MessageController.updateMessageCancelacion);

module.exports = api 