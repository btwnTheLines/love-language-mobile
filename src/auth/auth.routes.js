//HTTP Endpoints 

const express = require('express');

const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();
const authController = require('./auth.controller');

/** 
* GET /api/users/me/love-languages
* Get current user love language rankings
*/
router.get('/api/users/me/love-languages', authMiddleware, authController.retrieve_lls);

/** 
* PUT /api/users/me/love-languages
* Replace current user love language rankings
*/
router.put('/api/users/me/love-languages', authMiddleware, authController.replace_lls);

/**
 * POST /api/auth/register
 * Creates a new user account
 */

router.post('/register', authController.register);

/**
 * POST /api/auth/login
 * Authenticates a user and returns a JWT
 */
router.post('/login', authController.login);

module.exports = router;