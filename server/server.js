const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(express.static(path.join(__dirname, 'build')));

const cors = require('cors');
app.use(bodyParser.urlencoded({ extended: true }));

//Parse application/json
app.use(bodyParser.json());

//CORS is enabled for all origins
app.use(cors())

//Routes
app.use( require('./routes/index') );

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build/index.html'));
});

//Database Connection
const db = require('./database/db');

try {
    db.authenticate().then( () => {
        console.log("Database connection successfull")
    })
} catch (error) {
    console.log("Error connection, please check settings in .env file")
}

app.listen(port, () => {
  console.log(`App running on port:${port}`);
});


