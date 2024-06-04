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
        res.send('gestion', { historialVuelo });
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

router.post('/', async (req, res) => {
    const formData = req.body;

    try {
        const response = await axios.post('https://your-api-url.com/endpoint', formData);
        res.json({ message: 'Formulario enviado correctamente', data: response.data });
    } catch (error) {
        console.error('Error al enviar el formulario:', error);
        res.status(500).json({ message: 'Error al enviar el formulario', error: error.message });
    }
});

module.exports = router;