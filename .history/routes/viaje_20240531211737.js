const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware'); 

router.get('/viaje', verifyToken, (req, res) => {
    res.status(200).send('Datos protegidos: acceso concedido');
});