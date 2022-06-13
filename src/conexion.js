const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));//para ver en consola lo que se esta haciendo en el servidor

app.use(cors());

app.use(bodyParser.urlencoded({ extended:false}));
app.use(bodyParser.json());

app.use(require('./routes/rutas'))//para habilitar las rutas.js

module.exports = app;