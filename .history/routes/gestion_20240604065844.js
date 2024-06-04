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
        const { vueloId, equipaje, cantidad } = req.body;
        await viajeController.registrarEquipaje(req.cookies.userId, vueloId, equipaje, cantidad);
        res.redirect(`/`);
    } catch (error) {
        console.error('Error al agregar equipaje:', error);
        res.status(500).send('Error al agregar equipaje');
    }
});

// Manejar la solicitud POST para agregar un gasto al vuelo
router.post('/agregar-gasto', async (req, res) => {
    try {
        const { vueloId, gasto, monto } = req.body;
        await viajeController.registrarGastos(req.cookies.userId, vueloId, gasto, monto);
        res.redirect(`/`);
    } catch (error) {
        console.error('Error al agregar gasto:', error);
        res.status(500).send('Error al agregar gasto');
    }
});

module.exports = router;
