const db = require("../database/db.js")

const { DataTypes } = require("sequelize")

const ComandaDetalleModel = db.define('ComandaDetalle', {
  h_comanda_id: DataTypes.INTEGER,
  h_insumo_id: DataTypes.INTEGER,
  descripcion: DataTypes.STRING,
  costo: DataTypes.DECIMAL,
  pvp: DataTypes.DECIMAL,
  porcion: DataTypes.DECIMAL,
  unidad_medida: DataTypes.STRING
},{
    tableName: 'h_comanda_det',
    timestamps: false
});

module.exports = ComandaDetalleModel