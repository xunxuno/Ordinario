const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const viajeController = require('../controllers/viajeController');

router.get('/', authMiddleware.verifyToken, async (req, res) => {
    try {
        const vueloId = req.query.vueloId; // Supongamos que obtenemos el vueloId de la query
        const [equipaje, gastos, actividades, resumen] = await Promise.all([
            viajeController.ObtenerEquipaje(vueloId),
            viajeController.ObtenerGastos(vueloId),
            viajeController.ObtenerActividad(vueloId),
            viajeController.obtenerResumenVuelo(vueloId)
        ]);
        
        res.render('gestion', {vueloId, equipaje, gastos, actividades, resumen });
    } catch (error) {
        console.error('Error al obtener los datos del vuelo:', error);
        res.status(500).send('Error al obtener los datos del vuelo');
    }
});
router.post('/:id', async (req, res) => {
    try {
        const vueloId = req.params.id;
        // Lógica para gestionar el vuelo con el ID proporcionado
        // Puedes utilizar vueloId para acceder a la información del vuelo en la base de datos, por ejemplo
        res.send(`Gestionando vuelo con ID: ${vueloId}`);
    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        res.status(500).send('Error interno del servidor');
    }
});
router.post('/agregar-actividad', async (req, res) => {
    try {
        const { idUbicacion, vueloId } = req.body;
        await viajeController.registrarActividad(idUbicacion, vueloId);
        res.redirect(`/?vueloId=${vueloId}`);  // Redirigir de vuelta a la página de gestión
    } catch (error) {
        console.error('Error al registrar la actividad:', error);
        res.status(500).send('Error al registrar la actividad');
    }
});

router.post('/agregar-equipaje', async (req, res) => {
    try {
        const { userId, vueloId, equipaje, cantidad } = req.body;
        await viajeController.registrarEquipaje(userId, vueloId, equipaje, cantidad);
        res.redirect(`/?vueloId=${vueloId}`);  // Redirigir de vuelta a la página de gestión
    } catch (error) {
        console.error('Error al registrar el equipaje:', error);
        res.status(500).send('Error al registrar el equipaje');
    }
});

router.post('/agregar-gasto', async (req, res) => {
    try {
        const { userId, vueloId, gasto, monto } = req.body;
        await viajeController.registrarGastos(userId, vueloId, gasto, monto);
        res.redirect(`/?vueloId=${vueloId}`);  // Redirigir de vuelta a la página de gestión
    } catch (error) {
        console.error('Error al registrar el gasto:', error);
        res.status(500).send('Error al registrar el gasto');
    }
});

module.exports = router;
