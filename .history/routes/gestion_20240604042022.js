const express = require('express');
const router = express.Router();
const viajeController = require('../controllers/viajeController');
const authMiddleware = require('../middlewares/authMiddleware'); 

router.get('/', authMiddleware.verifyToken, async (req, res) => {
    res.render('gestion');      
});

module.exports = router;