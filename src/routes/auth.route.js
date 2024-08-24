/**
 * @license Apache-2.0
 * @copyright manhquan 2024
 */

'use strict';


/**
 * node module
 */
const router = require('express').Router();


/**
 * custom modules
 */
const { auth, callback } = require('../controllers/auth.controller');
const { refreshToken } = require('../controllers/refresh_token.controler');

router.get('/', auth);

router.get('/callback', callback);

router.get('/refresh_token', refreshToken)


module.exports = router;