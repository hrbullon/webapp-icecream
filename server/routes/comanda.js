const express = require('express');

const { 
    saveComandaDetail, 
    removeComandaDetail, 
    saveComanda, 
    getComanda, 
    updateComanda } = require('../controllers/ComandaController');

let app = express(); 

app.post('/comanda', saveComandaDetail);
app.delete('/comanda/:id', removeComandaDetail);
app.post('/comanda', saveComanda);
app.get('/comanda/:id', getComanda);
app.put('/comanda/:id', updateComanda);

module.exports = app;