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
const detalles_viaje = require('./detalles_viaje');
const gestion = require('./gestion');
const resumen = require('./resumen');

// Configura las rutas
router.use('/', index);
router.use('/login',authMiddleware.redirectIfAuthenticated, login);
router.use('/registro',authMiddleware.redirectIfAuthenticated, registro);
router.use('/registrar-usuario',authMiddleware.redirectIfAuthenticated, registrarUsuario);
router.use('/viaje',authMiddleware.verifyToken, viaje);
router.use('/logout', authMiddleware.verifyToken, logout); // Usa la ruta de logout
router.use('/detalles_viaje', authMiddleware.verifyToken, detalles_viaje);
router.use('/gestion',authMiddleware.verifyToken, gestion);
router.use('/resumen',authMiddleware.verifyToken, resumen);



module.exports = router;