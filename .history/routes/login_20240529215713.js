const express = require('express');
const router = express.Router();
const passport = require('passport');
const authMiddleware = require('../middlewares/authMiddleware'); // Middleware para proteger rutas

// Rutas públicas
router.get('/', (req, res) => {
    res.render('login', { title: 'Iniciar sesion', user: req.user != null ? `${req.user.nombre}` : ''  });
});

// ruta POST
router.post('/', passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true
  }), (req, res) => {
    // Si se autentica correctamente, crea un token JWT
    const token = authMiddleware.generateToken(req.user.id);
  
    res.cookie('token', token, { httpOnly: true, secure: true });
  
    res.redirect('/index');
  });
module.exports = router;