const express = require('express');
const router = express.Router();
const passport = require('passport');
const authMiddleware = require('../middlewares/authMiddleware'); // Middleware para proteger rutas
const usuarioController = require('../controllers/usuarioController');

// Rutas públicas
router.get('/',authMiddleware.redirectIfAuthenticated, (req, res) => {
    res.render('login', { title: 'Iniciar sesion', user: req.user != null ? `${req.user.nombre}` : ''  });
});

// ruta POST
router.post('/', async (req, res) => {
  const { nombre, password } = req.body;

  try {
    const { token, userId } = await usuarioController.logearUsuario(nombre, password);
    res.cookie('token', token, { httpOnly: true, secure: true }); // Configurar la cookie para el token
    res.cookie('userId', userId, { httpOnly: true, secure: true }); // Configurar la cookie para el userId
    console.log('Token almacenado en cookie:', token);
    console.log('UserId almacenado en cookie:', userId);
    console.log('Logeado correctamente');
    res.redirect('/'); // Redirige a una ruta protegida después del login
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error interno del servidor');
  }
});

  
module.exports = router;