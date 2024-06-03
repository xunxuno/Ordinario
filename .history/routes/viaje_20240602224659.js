const express = require('express');
const router = express.Router();
const viajeController = require('../controllers/viajeController');
const authMiddleware = require('../middlewares/authMiddleware'); 

router.get('/', authMiddleware.verifyToken, (req, res) => {
    //res.status(200).send('Datos protegidos: acceso concedido');
    console.log('Datos protegidos: acceso concedido');
    res.render('viaje');
});


router.post('/', async (req, res) => {
    const datosFormulario = req.body;
    const { destino, fly, cantidad, flightPrice, date, hotel, noches, hotelPrice } = req.body;
    const userId = req.cookies.userId;
    console.log(datosFormulario);

    try {
        // Supongamos que deseas enviar estos datos a una API externa
        await viajeController.registrarViaje(userId, destino, fly, cantidad, flightPrice, date, hotel, noches, hotelPrice);
        console.log('viaje registrado con exito');
        res.redirect('/');
    } catch (error) {
        console.error('Error al procesar el formulario:', error);
        res.redirect('/');
        //res.status(500).json({ message: 'Error al procesar el formulario', error: error.message });
    }
});

module.exports = router;