const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware'); 

router.get('/', authMiddleware.verifyToken, (req, res) => {
    //res.status(200).send('Datos protegidos: acceso concedido');
    console.log('Datos protegidos: acceso concedido');
    res.render('viaje');
});

module.exports = router;