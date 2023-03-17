require('dotenv').config();
const { Sequelize } = require('sequelize')

const { DB_DATABASE, DB_USER, DB_PASS, DB_HOST } = process.env

const db = new Sequelize(DB_DATABASE,DB_USER, DB_PASS,{
    host: DB_HOST,
    dialect:'mysql'
})

module.exports = db