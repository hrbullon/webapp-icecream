const db = require("../database/db.js")

const { DataTypes } = require("sequelize")

const ComandaModel = db.define('Comanda', {
  fecha: DataTypes.DATE,
  empresa_id: DataTypes.INTEGER,
  cedula: DataTypes.STRING,
  descripcion: DataTypes.STRING,
  nro_comanda: DataTypes.STRING,
  precio_final: DataTypes.DECIMAL,
  estatus: DataTypes.TINYINT
},{
    tableName: 'h_comanda',
    timestamps: false
});

module.exports = ComandaModel