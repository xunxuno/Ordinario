const express = require('express');
const router = express.Router();
const viajeController = require('../controllers/viajeController');
const authMiddleware = require('../middlewares/authMiddleware'); 

router.get('/', authMiddleware.verifyToken, async (req, res) => {
    res.render('gestion');
});

router.post('/', async (req, res) => {
    const vueloData = {
        destino: req.body.destino,
        vuelo: req.body.vuelo,
        cantidad_boletos: req.body.cantidad_boletos,
        precio_vuelo: req.body.precio_vuelo,
        fecha_vuelo: req.body.fecha_vuelo,
        hotel: req.body.hotel,
        noches_hospedaje: req.body.noches_hospedaje,
        precio_hotel: req.body.precio_hotel,
    };

    console.log(vueloData);
    res.render('gestion', {vueloData});
});

module.exports = router;