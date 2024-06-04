const express = require('express');
const router = express.Router();
const viajeController = require('../controllers/viajeController');
const authMiddleware = require('../middlewares/authMiddleware'); 

router.get('/', authMiddleware.verifyToken, async (req, res) => {
    res.render('gestion');
});

router.post('/', async (req, res) => {
    const destino = req.body.destino;
    const vuelo = req.body.vuelo;
    const cantidadBoletos = req.body.cantidad_boletos;
    const precioVuelo = req.body.precio_vuelo;
    const fechaVuelo = req.body.fecha_vuelo;
    const hotel = req.body.hotel;
    const nochesHospedaje = req.body.noches_hospedaje;
    const precioHotel = req.body.precio_hotel;

    console.log('Destino:', destino);
});

module.exports = router;