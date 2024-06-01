const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware'); 

router.get('/',authMiddleware.verifyToken, (req, res) => {
    res.clearCookie('token'); // Elimina la cookie del token
    console.log('Sesion cerrada con exito');
    res.redirect('/'); // Redirige al usuario a la página de login
});

module.exports = router;