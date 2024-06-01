// authMiddleware.js
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

function verifyToken(req, res, next) {
    const tokenlog = req.cookies.token;
    if (!tokenlog) {
        console.log('Token no proporcionado');
        return res.redirect('/login');
    }

    jwt.verify(tokenlog, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send('Token no válido');
        }
        req.user = decoded;
        next();
    });
}

function redirectIfAuthenticated(req, res, next) {
    const tokenlog = req.cookies.token;
    if (tokenlog) {
        jwt.verify(tokenlog, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                // Si el token no es válido, continuar al siguiente middleware/ruta
                return next();
            } else {
                // Si el token es válido, redirigir a la página principal u otra
                return res.redirect('/');
            }
        });
    } else {
        // Si no hay token, continuar al siguiente middleware/ruta
        next();
    }
}

async function authenticate(req, res, next) {
    // Verifica si hay un token en las cookies de la solicitud
    const token = req.cookies.token;

    // Si no hay token, redirige al usuario al login
    if (!token) {
        return res.redirect('/login');
    }

    try {
        // Verifica el token usando la clave privada RSA del entorno
        //const decoded = jwt.verify(token, process.env.RSA_PRIVATE_KEY);

        // Almacena el ID del usuario en la solicitud para su posterior uso
        //req.userId = decoded.userId;

        next();

    } catch (err) {
        // Si hay un error en la verificación del token, redirige al usuario al login
        return res.redirect('/login');
    }
}

// Función para generar un token JWT
function generateToken(data, expirationTime) {
    // Se firma el token utilizando el algoritmo RS256 y la clave privada RSA del entorno
    return jwt.sign({ data }, process.env.RSA_PRIVATE_KEY, { algorithm: 'RS256', expiresIn: expirationTime });
}


// Función asincrónica para obtener el hash de una contraseña
async function getHash(passwordString) {
    // Se obtiene el número de rondas de sal para el hash de contraseñas desde el entorno y se convierte a entero
    const saltRounds = parseInt(process.env.PASSWORD_SALT_ROUNDS);
    // Se genera el hash de la contraseña usando bcrypt y el número de rondas de sal
    const password_hash = await bcrypt.hash(passwordString, saltRounds);
    // Se devuelve el hash generado
    return password_hash;
}

module.exports = {
    authenticate,
    generateToken,
    verifyToken,
    getHash,
    redirectIfAuthenticated
};