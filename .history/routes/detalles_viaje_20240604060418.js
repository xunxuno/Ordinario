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
            precio_hotel: req.body.precio_hotel,
            id: req.body.vueloId // Asegúrate de que el id del vuelo se pase correctamente
        };

        res.render('gestion', { vueloData });
    } catch (error) {
        console.error('Error al procesar los datos del vuelo:', error);
        res.status(500).send('Error al procesar los datos del vuelo');
    }
});

// Ruta para manejar la adición de actividades
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

// Ruta para manejar la adición de equipaje
router.post('/agregar-equipaje', async (req, res) => {
    try {
        const { vueloId, equipaje, cantidad } = req.body;
        await viajeController.registrarEquipaje(req.cookies.userId, vueloId, equipaje, cantidad);
        res.redirect(`/detalles_viaje/gestion/${vueloId}`);
    } catch (error) {
        console.error('Error al agregar equipaje:', error);
        res.status(500).send('Error al agregar equipaje');
    }
});

// Ruta para manejar la adición de gastos
router.post('/agregar-gasto', async (req, res) => {
    try {
        const { vueloId, gasto, monto } = req.body;
        await viajeController.registrarGastos(req.cookies.userId, vueloId, gasto, monto);
        res.redirect(`/detalles_viaje/gestion/${vueloId}`);
    } catch (error) {
        console.error('Error al agregar gasto:', error);
        res.status(500).send('Error al agregar gasto');
    }
});

module.exports = router;
