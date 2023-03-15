const config = require('../config/config');
const { Sequelize } = require('sequelize')

const { DB_DATABASE, DB_USER, DB_PASS, DB_HOSTNAME } = config

const db = new Sequelize("jmw","root", "12792814",{
    host: DB_HOSTNAME,
    dialect:'mysql'
})

module.exports = db