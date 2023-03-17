const express = require('express');

const { 
    saveComandaDetail, 
    removeComandaDetail, 
    saveComanda, 
    getComanda, 
    updateComanda } = require('../controllers/ComandaController');

let app = express(); 

app.delete('/comanda/detail/:id', removeComandaDetail);
app.post('/comanda', saveComanda);
app.post('/comanda/detail', saveComandaDetail);
app.get('/comanda/:id', getComanda);
app.put('/comanda/:id', updateComanda);

module.exports = app;