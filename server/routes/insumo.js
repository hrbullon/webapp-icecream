const express = require('express');

const { getAllInsumos } = require('../controllers/InsumoController');

let app = express(); 

app.get('/insumos', getAllInsumos);

module.exports = app;