const usuarioModel = require('../models/usuarioModel');

async function registrarUsuario(req, res) {
    try {
        const { nombre, email, password } = req.body;
        const newUser = await usuarioModel.registrarUsuario(nombre, email, password);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function loginUsuario(req, res) {
    try {
        const { nombre, password } = req.body;
        const user = await usuarioModel.logearUsuario(nombre, password);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    registrarUsuario,
    loginUsuario
};
