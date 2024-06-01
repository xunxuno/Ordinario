// routes/routes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware'); 

// Importa las rutas específicas
const index = require('./index');
const login = require('./login');
const registro = require('./registro');
const registrarUsuario = require('./registrar-usuario');
const viaje = require('./viaje');

// Configura las rutas
router.use('/', index);
router.use('/login', login);
router.use('/registro', registro);
router.use('/registrar-usuario', registrarUsuario);
router.use('/viaje', viaje);



module.exports = router;