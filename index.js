import express from 'express';
import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

import { connect } from './app/config/database.js';

import session from 'express-session';
import MongoStore from 'connect-mongo';

// import passport from 'passport';
// import './authentication/passport.js';
// import { isAuth } from './authentication/passport.js';

// import { userRoutes } from './routes/user.routes.js';
// import { characterRoutes } from './routes/character.routes.js';
// import { locationRoutes } from './routes/location.routes.js';


// SERVER
const PORT = process.env.PORT;
const server = express();

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello!');
});

// Middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(path.join(__dirname, 'public')));

// Passport & Session
// server.use(
//   session({
//     secret: process.env.SESSION_SECRET, // ¡Este secreto tendremos que cambiarlo en producción!
//     resave: false, // Solo guardará la sesión si hay cambios en ella.
//     saveUninitialized: false, // Lo usaremos como false debido a que gestionamos nuestra sesión con Passport
//     cookie: {
//       maxAge: 3600000 // Milisegundos de duración de nuestra cookie, en este caso será una hora.
//     },
//     store: MongoStore.create({
//       mongoUrl: DB_URL,
//     })
//   })
// );
// server.use(passport.initialize());
// server.use(passport.session());

// Routes
// server.use('/users', userRoutes);
// server.use('/characters', characterRoutes);
// server.use('/locations', [isAuth], locationRoutes);

// Error Control 404
server.use('*', (req, res, next) => {
  const error = new Error('Route not found');
  error.status = 404;
  next(error);
});
server.use((err, req, res, next) => {
  return res.status(err.status || 500).json(err.message || 'Unexpected error');
});


server.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`);
});

//JWT
server.set("secretKey", "nodeRestApi");
