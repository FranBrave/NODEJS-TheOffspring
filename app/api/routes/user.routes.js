import express, { userRoutes } from 'express';
const userRoutes = express.Router();
import { newUser, login, logout } from '../controllers/user.controller.js';
import { isAuth } from '../../middlewares/auth.midleware.js';

router.post('/register', newUser);
router.post('/login', login);
router.post('/logout',[isAuth], logout);

export { userRoutes }