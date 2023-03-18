
const moment = require('moment'); 

const ComandaModel = require("../models/ComandaModel");
const ComandaDetalleModel = require("../models/ComandaDetalleModel");

const empresa_id = process.env.EMPRESA_ID;

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
            let descripcion = "";

            details.map( item => {
               
                sum+=Number(item.pvp);

                //Si el tipo de producto
                if(descripcion == ""){
                    descripcion = item.descripcion;
                }
            });

            ComandaModel.update({ descripcion: descripcion ,precio_final: sum }, { where: { id: id } })
            .then(comanda => {
                res.json({ message: "Ok", comanda });
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

const saveComandaDetail = async (req, res) => {
    try {
        const created = await ComandaDetalleModel.create(req.body);
        const detail = await ComandaDetalleModel.findOne({ where: { id: created.id } });
        res.json({ message: "Ok", detail });
    } catch (error) {
        res.json({ message: error.message });
    }
}

const removeComandaDetail = async (req, res) => {
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
    getComanda,
    saveComanda,
    updateComanda,
    saveComandaDetail,
    removeComandaDetail
}