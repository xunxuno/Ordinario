const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware'); 
const viajeController = require('../controllers/viajeController');

router.get('/', authMiddleware.verifyToken, async (req, res) => {
    try {
        // Obtener el userId del cookie
        const userId = req.cookies.userId;

        // Obtener el historial de vuelo utilizando la función historialVuelos
        const historialVuelo = await historialVuelos(userId);

        // Imprimir el historial de vuelo en la consola del servidor para verificar
        console.log('Historial de vuelo:', historialVuelo);

        // Enviar el historial de vuelo a la plantilla "detalles_viaje" para ser renderizado
        res.render('detalles_viaje', { historialVuelo });
    } catch (error) {
        console.error('Error al obtener el historial de vuelo:', error);
        res.status(500).send('Error interno del servidor');
    }
});

// Función para obtener el historial de vuelos usando el controlador de viaje
async function historialVuelos(userId) {
    try {
        const historial = await viajeController.historial(userId);
        return historial;
    } catch (error) {
        throw error;
    }
}

// Ruta para manejar la gestión del viaje
router.post('/gestion', async (req, res) => {
    try {
        const vueloData = {
            destino: req.body.destino,
            vuelo: req.body.vuelo,
            cantidad_boletos: req.body.cantidad_boletos,
            precio_vuelo: req.body.precio_vuelo,
            fecha_vuelo: req.body.fecha_vuelo,
            hotel: req.body.hotel,
            noches_hospedaje: req.body.noches_hospedaje,
            precio_hotel: req.body.precio_hotel
        };

        // Procesar los datos del vuelo aquí si es necesario

        res.render('gestion', { vueloData });
    } catch (error) {
        console.error('Error al procesar los datos del vuelo:', error);
        res.status(500).send('Error al procesar los datos del vuelo');
    }
});

module.exports = router;
