// Router configuration
// What routes are we using?
// Where are we taking them from?

import express from 'express';
import posts from './posts';
import users from './users';
import comments from './comments'
import shelters from './shelters';

const router = express.Router();

router.use('/shelters', shelters);
router.use('/posts', posts);
router.use('/users', users);
router.use('/comments', comments);

export default router;