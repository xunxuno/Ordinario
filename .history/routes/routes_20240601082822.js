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
const logout = require('./logout'); // Importa la ruta de logout

// Configura las rutas
router.use('/', index);
router.use('/login',authMiddleware.redirectIfAuthenticated, login);
router.use('/registro',authMiddleware.redirectIfAuthenticated, registro);
router.use('/registrar-usuario', registrarUsuario);
router.use('/viaje',authMiddleware.verifyToken, viaje);
router.use('/logout', authMiddleware.verifyToken, logout); // Usa la ruta de logout



module.exports = router;