const express = require('express');
const router = express.Router();
const passport = require('passport');
const authMiddleware = require('../middlewares/authMiddleware'); // Middleware para proteger rutas
const usuarioController = require('../controllers/usuarioController');

// Rutas públicas
router.get('/', (req, res) => {
    res.render('login', { title: 'Iniciar sesion', user: req.user != null ? `${req.user.nombre}` : ''  });
});

// ruta POST
router.post('/', async (req, res) => {
  const { nombre, password} = req.body

  try {
    const { token, usuario } = await usuarioController.logearUsuario(nombre, password);
    res.cookie('token', token, { httpOnly: true, secure: true }); // Configurar la cookie
    console.log('Token almacenado en cookie:', token);
    console.log('Logeado correctamente');
     res.redirect('/index'); // Redirige a una ruta protegida después del login
  }
  catch (error){
    console.error(error.message);
    res.status(500).send('Error interno del servidor');
  }
});
  
module.exports = router;