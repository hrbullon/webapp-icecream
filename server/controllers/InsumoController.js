const moment = require('moment'); 

const InsumoModel = require("../models/InsumoModel")
const ComandaModel = require("../models/ComandaModel")
const ComandaDetalleModel = require("../models/ComandaDetalleModel")

const empresa_id = 19;

const getAllInsumos = async (req, res) => {
    try {
        const insumos = await InsumoModel.findAll();
        res.json(insumos)
    } catch (error) {
        res.json({ message: error.message });
    }
}

const getComanda = async (req, res) => {
    try {

        const comanda = await ComandaModel.findByPk(req.params.id);
        const details = await ComandaDetalleModel.findAll({
            where: {
                h_comanda_id: req.params.id
            }
        });

        res.json({ comanda, details })
    } catch (error) {
        res.json({ message: error.message });
    }
}

const updateComanda = async (req, res) => {
    try {
        const { id } = req.params;
        const comanda = await ComandaModel.findByPk(id);
        const details = await ComandaDetalleModel.findAll({
            where: {
                h_comanda_id: id
            }
        });

        if(comanda && details){
            
            let sum = 0;
            details.map( item =>  sum+=Number(item.pvp) );
           
            ComandaModel.update({ precio_final: sum }, { where: { id: id } })
            .then(numAffectedRows => {
                res.json({ message: "Ok", numAffectedRows });
            })
            .catch(err => {
                res.json({ message: "Error" });
            });

        }else{
            res.json({ message: "Error" });
        }
        
    } catch (error) {
        res.json({ message: error.message });
    }
}

const saveComanda = async (req, res) => {
    try {
        req.body.empresa_id = empresa_id;
        req.body.fecha = moment().format("YYYY-MM-DD");

        const created = await ComandaModel.create(req.body);
        const detail = await ComandaModel.findOne({ where: { id: created.id } });
        res.json({ message: "Ok", detail });
    } catch (error) {
        res.json({ message: error.message });
    }
}

const saveInsumoDetail = async (req, res) => {
    try {
        const created = await ComandaDetalleModel.create(req.body);
        const detail = await ComandaDetalleModel.findOne({ where: { id: created.id } });
        res.json({ message: "Ok", detail });
    } catch (error) {
        res.json({ message: error.message });
    }
}

const removeInsumoDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const detail = await ComandaDetalleModel.findByPk(id);

        if(detail){
            await ComandaDetalleModel.destroy({
                where: {
                    id: id
                }
            });
            res.json({ message: "Ok", detail });
        }else{
            res.json({ message: "Error" });
        }
    } catch (error) {
        res.json({ message: error.message });
    }
}

module.exports = {
    getAllInsumos,
    saveInsumoDetail,
    removeInsumoDetail,
    saveComanda,
    getComanda,
    updateComanda
}