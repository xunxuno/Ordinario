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


module.exports = router;