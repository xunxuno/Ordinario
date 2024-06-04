const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const viajeController = require('../controllers/viajeController');

// Manejar la solicitud POST para agregar una actividad al vuelo
router.post('/agregar-actividad', async (req, res) => {
    try {
        const { vueloId, actividad, fecha_actividad } = req.body;
        await viajeController.registrarActividad(actividad, vueloId);
        res.redirect(`/detalles_viaje/gestion/${vueloId}`);
    } catch (error) {
        console.error('Error al agregar actividad:', error);
        res.status(500).send('Error al agregar actividad');
    }
});

// Manejar la solicitud POST para agregar equipaje al vuelo
router.post('/agregar-equipaje', async (req, res) => {
    try {
        // Extraer los datos del formulario
        const { vueloId, equipaje, cantidad } = req.body;

        // Lógica para agregar el equipaje al vuelo con el ID proporcionado
        // ...

        res.send('Equipaje agregado exitosamente');
    } catch (error) {
        console.error('Error al agregar el equipaje:', error);
        res.status(500).send('Error interno del servidor');
    }
});

// Manejar la solicitud POST para agregar un gasto al vuelo
router.post('/agregar-gasto', async (req, res) => {
    try {
        // Extraer los datos del formulario
        const { vueloId, gasto, monto } = req.body;

        // Lógica para agregar el gasto al vuelo con el ID proporcionado
        // ...

        res.send('Gasto agregado exitosamente');
    } catch (error) {
        console.error('Error al agregar el gasto:', error);
        res.status(500).send('Error interno del servidor');
    }
});

module.exports = router;
