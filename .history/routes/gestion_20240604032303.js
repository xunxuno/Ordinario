const express = require('express');
const router = express.Router();
const viajeController = require('../controllers/viajeController');
const authMiddleware = require('../middlewares/authMiddleware'); 

router.get('/', authMiddleware.verifyToken, async (req, res) => {
    console.log('Datos protegidos: acceso concedido');
    res.render('gestion');
    try {

        const userId = req.cookies.userId;
        const historialVuelo = await historialVuelos(userId); 
        console.log('Historial de vuelo:', historialVuelo)
        res.render('gestion', { historialVuelo });      
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

router.post('/', async (req, res) => {
    const formData = req.body;
    try {
        await viajeController.registrarEquipaje(userId, id_vuelo, elemento, cantidad);
        console.log('equipaje registrado');
        res.redirect('/detalles_viaje');
    } catch (error) {
        console.error('Error al enviar el formulario:', error);
        res.redirect('/');
    }
});

module.exports = router;