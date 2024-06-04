const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const viajeController = require('../controllers/viajeController');

router.get('/:id', authMiddleware.verifyToken, async (req, res) => {
        res.render('/');
});

async function historialVuelos(userId) {
    try {
        const historial = await viajeController.historial(userId);
        return historial;
    } catch (error) {
        throw error;
    }
}


router.post('/:id', async (req, res) => {
    try {
        const vueloid = req.params.id;
        const resumen = await viajeController.obtenerResumenVuelo(req.params.id);
        console.log({resumen});
        //res.render('resumen', {resumen});
        const vuelo = resumenVuelo.vuelo[0]; // Obtiene el primer vuelo
        const destino = vuelo.destino;
        const precioVuelo = vuelo.precio_vuelo;
        const nombreHotel = resumenVuelo.hotel.nombre;
        res.render('resumen', {
            destino: vuelo.destino,
            precioVuelo: vuelo.precio_vuelo,
            nombreHotel: resumenVuelo.hotel.nombre,
            // Pasa las demás propiedades que deseas mostrar
          });
    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        res.status(500).send('Error interno del servidor');
    }
});

module.exports = router;