const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 8569;

app.use(express.static(path.join(__dirname, 'client/build')));

const cors = require('cors');
app.use(bodyParser.urlencoded({ extended: true }));

//Parse application/json
app.use(bodyParser.json());

//CORS is enabled for all origins
app.use(cors())

//Routes
app.use( require('./routes/index') );

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

//Database Connection
const db = require('./database/db');

try {
    db.authenticate().then( () => {
        console.log("Conexión exitosa a la base de datos")
    })
} catch (error) {
    console.log("Error en la conexión")
}

app.listen(port, () => {
  console.log(`La aplicación está escuchando en http://:${port}`);
});


