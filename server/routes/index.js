const express = require('express');

const app = express();

app.use( require('./insumo') );

module.exports = app;