const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    res.clearCookie('token'); // Elimina la cookie del token
    res.redirect('/login'); // Redirige al usuario a la página de login
});

module.exports = router;