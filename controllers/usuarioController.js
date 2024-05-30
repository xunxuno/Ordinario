const usuarioModel = require('../models/usuarioModel');
const authMiddleWare = require('../middlewares/authMiddleware');

// Función asincrónica para registrar un usuario
async function registrarUsuario(nombre, email, password_hash) {
    // Se registra al usuario en la base de datos
    return await usuarioModel.registrarUsuario(nombre, email, password_hash);
}

// Función asincrónica para logear a un usuario
async function logearUsuario(nombre, password) {
    // Se intenta logear al usuario en la aplicación
    return await usuarioModel.logearUsuario(nombre, password);
}

module.exports = {
    registrarUsuario,
    logearUsuario
};
