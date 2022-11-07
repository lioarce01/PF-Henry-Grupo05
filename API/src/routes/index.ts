import express from 'express';
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

import posts from './posts';
import users from './users';



const router = express.Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.use('/posts', posts);
router.use('/users', users);

export default router;