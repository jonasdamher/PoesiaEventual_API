'use strict';

import express from 'express';
const router = express.Router()
// Import routes
import authors from './components/authors';
import poems from './components/poems';

router.use('/authors', authors);
router.use('/poems', poems);

export default router;