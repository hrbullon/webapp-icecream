const db = require("../database/db.js")

const { DataTypes } = require("sequelize");

const InsumoModel = db.define('Insumo', {
  nombre: DataTypes.STRING,
  unidad_manejo: DataTypes.INTEGER,
  unidad_medida: DataTypes.STRING,
  costo: DataTypes.DECIMAL,
  precio_pvp: DataTypes.DECIMAL,
  tipo_producto: DataTypes.TINYINT,
  cantidad: DataTypes.DECIMAL,
  porcion: DataTypes.DECIMAL,
  img_producto: DataTypes.STRING,
  limite_porcion: DataTypes.TINYINT
},{
    tableName: 'h_insumos',
    timestamps: false
});

module.exports = InsumoModel