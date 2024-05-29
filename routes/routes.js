// routes/routes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware'); 

// Importa las rutas específicas
const index = require('./index');
const login = require('./login');
const registro = require('./registro');
const registrarUsuario = require('./registrar-usuario');

// Configura las rutas
router.use('/', index);
router.use('/login', login);
router.use('/registro', registro);
router.use('/registrar-usuario', registrarUsuario);


module.exports = router;