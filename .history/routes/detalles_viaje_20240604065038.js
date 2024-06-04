const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const viajeController = require('../controllers/viajeController');

router.get('/', authMiddleware.verifyToken, async (req, res) => {
    try {
        const userId = req.cookies.userId;
        const historialVuelo = await historialVuelos(userId);
        res.render('detalles_viaje', { historialVuelo });
    } catch (error) {
        console.error('Error al obtener el historial de vuelo:', error);
        res.status(500).send('Error interno del servidor');
    }
});

async function historialVuelos(userId) {
    try {
        const historial = await viajeController.historial(userId);
        return historial;
    } catch (error) {
        throw error;
    }
}


router.post('/gestion/:id', async (req, res) => {
    try {
        const vueloId = req.params.id;
        const vueloData = {
            Id: req.params.id, // Aquí usamos el vueloId obtenido de los parámetros de la ruta
            destino: req.body.destino,
            vuelo: req.body.vuelo,
            cantidad_boletos: req.body.cantidad_boletos,
            // Agrega aquí los otros campos del formulario
        };
        res.render('gestion', { vueloData });
    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        res.status(500).send('Error interno del servidor');
    }
});


module.exports = router;
