const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path');
const router =require('./routes/routes');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const SQLiteStore = require('connect-sqlite3')(session);
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const authMiddleware = require('./middlewares/authMiddleware');
const bodyParser = require('body-parser');
const db = require('./db');
// tablas y mas

//configura el cookie-parser
app.use(cookieParser());

//Configura el DotEnv
dotenv.config();

// configura el Middleware para manejar sesiones
app.use(session({
    secret: process.env.ACCESS_TOKEN_SECRET, // Clave secreta para firmar la cookie de sesión
    resave: false,
    saveUninitialized: false,
    store: new SQLiteStore({ db: 'sessionsDB.sqlite', table: 'sessions' }) // Almacena las sesiones en una base de datos SQLite
  }));

//configura connect-flash
app.use(flash());

// Configurar Passport.js
app.use(passport.initialize());
app.use(passport.session());

// Configurar estrategia de autentificación local
passport.use(new LocalStrategy(
    (username, password, done) => {
      db.obtenerUsuarioPorNombre(username, (err, user) => {
        if (err) { return done(err); }
        if (!user) { return done(null, false, { message: 'Usuario incorrecto.' }); }
        if (user.password !== password) { return done(null, false, { message: 'Contraseña incorrecta.' }); }
        return done(null, user);
      });
    }
  ));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async(id, done) => {
    await usuarios.obtenerPorId(id).then((user) => {
        done(null , user);
    }).catch((error) => {
        done(error, null);
    });
});

// Creacion de la variable para almacenar el caché
// Aqui va la varaible

// error
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('algo salió mal');
});

// configuracion de la plantilla pug
app.set('view engine', 'pug');
app.set('views' , path.join(__dirname, 'views'));

// Middleware para procesar los archivos estaticos en la carpeta 'public'
app.use(express.static('public'));
app.use(express.json());

app.use('/', router);

// Ruta para cerrar sesion
app.get('/logout', async (req, res) => {
    await req.logout(async (err) => {
        if (err) {
            // Manejo del error si es necesario
            console.erro(err);
        }
        // req.session.destroy(); // Eliminar la sesion completa
        await req.session.destory((err) => {
            if (err) {
                console.error('Error al destruir la sesion:', err);
                return res.status(500).send('Error al cerrar sesion');
            }
            console.log('req.session.destroy finalizado correctamente');
        });
        // Eliminar el contenido del almacen de sesiones
        await req.sessionStore.clear((err) => {
            if (err) {
                console.error('Error al limpiar el almacen de sesiones:', err);
                return res.status(500).send('Error al cerrar sesion');
            }
            console.log('req.sessionStore.clear finalizado correctamente');
        });
        res.clearCookie('token');
        res.redirect('/');
    });
})

// Puerto en el que escucha el servidor
const port = 3000;
app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});