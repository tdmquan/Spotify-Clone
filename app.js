/**
 * @license Apache-2.0
 * @copyright manhquan 2024
 */

'use strict';


/**
 * node modules
 */
const cors = require('cors');
const cookieParser = require('cookie-parser');


/**
 * custom module
 */
const login = require('./src/routes/login.routes');
const auth = require('./src/routes/auth.route');
const authenticatedUser = require('./src/middlewares/auth_user.middleware');
const home = require('./src/routes/home.route');
const explore = require('./src/routes/explore.route');
const album = require('./src/routes/album.route');
const playlist = require('./src/routes/playlist.route');
const profile = require('./src/routes/profile.route');
const search = require('./src/routes/search.route');
const artist = require('./src/routes/artist.route');
const track = require('./src/routes/track.route');
const logout = require('./src/routes/logout.route');

// Initial express app
const express = require('express');
const app = express();


/**
 * EJS setting
 */
app.set('view engine', 'ejs');


/**
 * setting static dir
 */
app.use(express.static(`${__dirname}/public`));

/**
 * Enable cors & cookie parser
 */
app.use(cors()).use(cookieParser());


/**
 * Encode post request body
 */
app.use(express.urlencoded({ extended: true }));


/**
 * Login page
 */
app.use('/login', login);

/**
 * Auth page
 */
app.use('/auth', auth);

/**
 * Check user is authenticated
 */
app.use(authenticatedUser);


/**
 * Logout page
 */
app.use('/logout', logout);


/**
 * Explore page
 */
app.use('/explore', explore);


/** 
 * Album page
 */
app.use('/album', album);


/**
 * Playlist page
 */
app.use('/playlist', playlist);


/**
 * Profile page
 */
app.use('/me', profile);


/**
 * Search results page
 */
app.use('/search', search);


/**
 * Artist page
 */
app.use('/artist', artist);


/**
 * Track page
 */
app.use('/track', track);


/**
 * Home page
 */
app.use('/', home);


/**
 * 404 page
 */
app.use((req, res) => {
    res.render('./pages/404');
});


app.listen(5000, () => {
    console.log('Server listening at http://localhost:5000');
});