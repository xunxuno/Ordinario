const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const viajeController = require('../controllers/viajeController');

router.get('/:id', authMiddleware.verifyToken, async (req, res) => {
        res.render('/');
});

async function historialVuelos(userId) {
    try {
        const historial = await viajeController.historial(userId);
        return historial;
    } catch (error) {
        throw error;
    }
}


router.post('/:id', async (req, res) => {
    try {
        const vueloid = req.params.id;
        const list = await viajeController.obtenerResumenVuelo(vueloid);
        console.log({list});
        res.render('resumen', {list});
    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        res.status(500).send('Error interno del servidor');
    }
});

module.exports = router;