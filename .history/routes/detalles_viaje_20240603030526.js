const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware'); 
const viajeController = require('../controllers/viajeController');

router.get('/', authMiddleware.verifyToken, async (req, res) => {
    //res.status(200).send('Datos protegidos: acceso concedido');
    console.log('Acceso concedido');
    const historialVuelo = await viajeController.historial(userId);
    res.render('detalles_viaje');
});

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