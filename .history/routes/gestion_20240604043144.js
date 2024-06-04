const express = require('express');
const router = express.Router();
const viajeController = require('../controllers/viajeController');
const authMiddleware = require('../middlewares/authMiddleware'); 

router.get('/', authMiddleware.verifyToken, async (req, res) => {
    const vueloId = req.query.vueloId;

    if (vueloId) {
      try {
        const viaje = await viajeController.obtenerViajePorId(vueloId);
        res.render('gestion', { viaje });
      } catch (error) {
        console.error('Error al obtener el viaje:', error);
        res.status(500).send('Error interno del servidor');
      }
    } else {
    res.render('gestion'); // Renderizar la vista sin datos específicos
    }  
});

module.exports = router;