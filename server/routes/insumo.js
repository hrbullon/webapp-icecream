const express = require('express');

const { 
    getAllInsumos, 
    saveInsumoDetail, 
    removeInsumoDetail, 
    saveComanda,
    getComanda, 
    updateComanda} = require('../controllers/InsumoController');

let app = express(); 

app.get('/insumos', getAllInsumos);
app.post('/insumos', saveInsumoDetail);
app.delete('/insumos/:id', removeInsumoDetail);
app.post('/comanda', saveComanda);
app.get('/comanda/:id', getComanda);
app.put('/comanda/:id', updateComanda);

module.exports = app;