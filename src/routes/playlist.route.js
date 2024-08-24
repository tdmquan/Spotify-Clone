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
const { playlist, playlistDetail } = require('../controllers/playlist.controller');


router.get(['/', '/page/:page'], playlist);

router.get('/:playlistId', playlistDetail);


module.exports = router;