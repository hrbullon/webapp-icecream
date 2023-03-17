const express = require('express');

const app = express();

app.use( require('./insumo') );
app.use( require('./comanda') );

module.exports = app;