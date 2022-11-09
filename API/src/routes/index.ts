import express from 'express';
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

import posts from './posts';
import users from './users';
import comments from './comments'
import shelters from './shelters';


const router = express.Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/shelters', shelters);
router.use('/posts', posts);
router.use('/users', users);
router.use('/comments', comments);

export default router;