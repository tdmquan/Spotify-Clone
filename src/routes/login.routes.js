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
 * custom module
 */
const { login } = require('../controllers/login.controller');


router.get('/', login);


module.exports = router;