const express = require ('express');
const app = express();

let enviar = require('../control/correo');

app.post('/envio',enviar.envio)

module.exports=app;

