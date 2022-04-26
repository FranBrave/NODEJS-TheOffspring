import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User } from '../models/User.js';

const userRoutes = express.Router();

userRoutes.post('/register', async (req, res, next) => {
  try {
    const { body } = req;

    // Comprobar usuario
    const previousUser = await User.findOne({ email: body.email });

    if (previousUser) {
      const error = new Error('The user is already registered!');
      return next(error);
    }

    // Encriptar password
    const pwdHash = await bcrypt.hash(body.password, 10);

    // Crear usuario en DB
    const newUser = new User({
      email: body.email,
      password: pwdHash,
    });
    const savedUser = await newUser.save();

    // Respuesta
    return res.status(201).json({
      status: 201,
      message: 'User registered successfully!',
      data: {
        id: savedUser._id
      }
    });

  } catch(error) {
    return next(error);
  }
});

userRoutes.post('/login', async (req, res, next) => {
  try {
    const { body } = req;

    // Comprobar email
    const user = await User.findOne({ email: body.email });

    // Comprobar password
    const isValidPassword = await bcrypt.compare(body.password, user?.password ?? '');
    // Control de LOGIN
    if (!user || !isValidPassword) {
      const error = {
        status: 401,
        message: 'The email & password combination is incorrect!'
      };
      return next(error);
    }

    // TOKEN JWT
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        rol: 'ADMIN'
      },
      req.app.get("secretKey"),
      { expiresIn: "1h" }
    );

    // Response
    return res.json({
      status: 200,
      message: 'Loggin success!',
      data: {
        userId: user._id,
        token: token
      },
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

userRoutes.post('/logout', async (req, res, next) => {
  try {
    req.authority = null;
    return res.json({
      status: 200,
      message: 'Logout!',
      token: null
    });
  } catch (error) {
    next(error)
  }
});

// TODO: PATCH para hacer edicion parcial del usuario (name, surname, age)

export { userRoutes };
