/**
 * @license Apache-2.0
 * @copyright manhquan 2024
 */

'use strict';


/**
 * custom modules
 */
const { getData } = require('../config/axios.config');
const { getUrlQuery } = require('../utils/helpers.util');


/**
 * Get Spotify catalog information about albums, artists, playlists, tracks that match a query string
 * 
 * @param {Object} req - server request object
 * @returns{Object}
 */
const getAll = async (req) => {
    const { query } = req.params;

    const { data: searchAll } = await getData(`/search?q=${query}&type=track,album,artist,playlist&limit=12`, req.cookies.access_token);

    return searchAll;
}


/**
 * Get Spotify catalog information about albums that match a query string
 * 
 * @param {Object} req = server request object
 * @returns {Object}
 */
const getAlbum = async (req) => {
    const { offset, limit, page } = getUrlQuery(req.params);
    const { query } = req.params;

    const { data: { albums: searchAlbum } } = await getData(`/search?q=${query}&type=album&limit=${limit}&offset=${offset}`, req.cookies.access_token);

    const baseUrl = `${req.baseUrl}/albums/${query}`;

    return { baseUrl, page, ...searchAlbum }
}


/**
 * Get Spotify catalog information about artist that match a query string
 * 
 * @param {Object} req = server request object
 * @returns {Object}
 */
const getArtist = async (req) => {
    const { offset, limit, page } = getUrlQuery(req.params);
    const { query } = req.params;

    const { data: { artists: searchArtist } } = await getData(`/search?q=${query}&type=artist&limit=${limit}&offset=${offset}`, req.cookies.access_token);

    const baseUrl = `${req.baseUrl}/artists/${query}`;

    return { baseUrl, page, ...searchArtist }
}


/**
 * Get Spotify catalog information about playlist that match a query string
 * 
 * @param {Object} req = server request object
 * @returns {Object}
 */
const getPlaylist = async (req) => {
    const { offset, limit, page } = getUrlQuery(req.params);
    const { query } = req.params;

    const { data: { playlists: searchPlaylist } } = await getData(`/search?q=${query}&type=playlist&limit=${limit}&offset=${offset}`, req.cookies.access_token);

    const baseUrl = `${req.baseUrl}/playlists/${query}`;

    return { baseUrl, page, ...searchPlaylist }
}


/**
 * Get Spotify catalog information about track that match a query string
 * 
 * @param {Object} req = server request object
 * @returns {Object}
 */
const getTrack = async (req, itemLimit) => {
    const { offset, limit, page } = getUrlQuery(req.params, itemLimit);
    const { query } = req.params;

    const { data: { tracks: searchTrack } } = await getData(`/search?q=${query}&type=track&limit=${limit}&offset=${offset}`, req.cookies.access_token);

    const baseUrl = `${req.baseUrl}/tracks/${query}`;

    return { baseUrl, page, ...searchTrack }
}

module.exports = {
    getAll,
    getAlbum,
    getArtist,
    getPlaylist,
    getTrack
}