const axios = require('axios');

class Usuario {
    constructor(id, nombre, email, password_hash) {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.password_hash = password_hash;
    }
}

async function registrarUsuario(nombre, email, password) {
    try {
        const response = await axios.post('http://localhost:3002/api/registrar', {
            dataSegura: {
                nombre,
                email,
                password
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        throw error;
    }
}


async function logearUsuario(nombre, password) {
    try {
        const response = await axios.post(`http://localhost:3002/api/login`, {
            dataSegura: {
                nombre,
                password
            }
        });
        const usuario = response.data;
        return new Usuario(usuario.id, usuario.nombre, usuario.email, usuario.password_hash);
    } catch (error) {
        console.error('Error al obtener usuario por nombre:', error);
        throw error;
    }
}

module.exports = {
    registrarUsuario,
    logearUsuario
};
