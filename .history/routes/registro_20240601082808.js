const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/',authMiddleware.redirectIfAuthenticated, (req, res) => {
    res.render('registro', { title: 'Registro' });
});
  
  module.exports = router;