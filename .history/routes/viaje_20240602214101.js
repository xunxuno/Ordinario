const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware'); 

router.get('/', authMiddleware.verifyToken, (req, res) => {
    //res.status(200).send('Datos protegidos: acceso concedido');
    console.log('Datos protegidos: acceso concedido');
    res.render('viaje');
});


router.post('/', async (req, res) => {
    const datosFormulario = req.body;
    console.log(datosFormulario);

    try {
        // Supongamos que deseas enviar estos datos a una API externa
        const response = await axios.post('https://api.externa.com/endpoint', datosFormulario);
        res.json({ message: 'Formulario recibido y procesado', data: response.data });
    } catch (error) {
        console.error('Error al procesar el formulario:', error);
        res.redirect('/');
        //res.status(500).json({ message: 'Error al procesar el formulario', error: error.message });
    }
});

module.exports = router;