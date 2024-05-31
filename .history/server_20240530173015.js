const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const SQLiteStore = require('connect-sqlite3')(session);
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const axios = require('axios');

dotenv.config();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.ACCESS_TOKEN_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new SQLiteStore({ db: 'sessionsDB.sqlite', table: 'sessions' })
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            const response = await axios.post('http://localhost:3002/api/login', { nombre: username, password });
            const user = response.data;

            if (!user) {
                return done(null, false, { message: 'Usuario incorrecto.' });
            }

            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const response = await axios.get(`http://localhost:3002/api/usuarios/${id}`);
        done(null, response.data);
    } catch (error) {
        done(error, null);
    }
});

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));

app.post('/register', async (req, res) => {
    try {
        await axios.post('http://localhost:3002/api/registrar', req.body);
        res.redirect('/login');
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).send('Error al registrar usuario');
    }
});

app.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).send('Error al cerrar sesión');
        }
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).send('Error al destruir la sesión');
            }
            res.clearCookie('connect.sid');
            res.redirect('/');
        });
    });
});

app.get('/api/datos', async (req, res) => {
    try {
        const respuesta = await axios.get('http://localhost:3002/api/usuarios');
        res.json(respuesta.data);
    } catch (error) {
        console.error('Error al obtener datos de la API local:', error);
        res.status(500).send('Error al obtener datos de la API local');
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});
