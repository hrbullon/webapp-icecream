const InsumoModel = require("../models/InsumoModel")

const getAllInsumos = async (req, res) => {
    try {
        const insumos = await InsumoModel.findAll();
        res.json(insumos)
    } catch (error) {
        res.json({ message: error.message });
    }
}

module.exports = {  getAllInsumos }