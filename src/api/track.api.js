/**
 * @license Apache-2.0
 * @copyright manhquan 2024
 */

'use strict';


/**
 * custom modules
 */
const {
    getData,
    musixmatchApi
} = require('../config/axios.config');

/**
 * Recommendations are generated based on the available
 *  information for a given seed entity and matched against similar
 * artists and tracks. If there is sufficient information about the
 * provided seeds, a list of tracks will be returned together with pool size details
 * 
 * @param {Object} req - server request object
 * @param {Object} trackSeed - object of artist or track seeds string
 * @param {number} itemLimit - the maximum number of items to return. default: 30
 * @returns {Object}
 */
const getRecommendedTrack = async (req, trackSeed, itemLimit) => {
    const { data: { tracks: recommendedTracks } } = await getData(`/recommendations?seed_tracks=${trackSeed}&limit=${itemLimit}`, req.cookies.access_token);

    return recommendedTracks;
}


/**
 * Get Spotify catalog information for a single track identified by its unique Spotify ID
 * 
 * @param {Object} req - server request object
 * @returns {Object} 
 */
const getDetail = async (req) => {
    const { trackId } = req.params;

    const { data: trackDetail } = await getData(`/tracks/${trackId}`, req.cookies.access_token);

    return trackDetail;
}


/**
 * Retrieves lyrics for a given track and artist using the Musixmatch API.
 * 
 * @param {string} trackName - The name of the track.
 * @param {string} artistName - The name of the artist.
 * @param {string|null} isrc -The International Standard Recording Code (ISRC) of the track, if available.
 * @returns {string} - The lyrics of the specified track and artist.
 */
const getLyrics = async (trackName, artistName, isrc = null) => {

    const { message: { body: { lyrics } } } = await musixmatchApi('matcher.lyrics.get?', {
        q_track: trackName.toLowerCase(),
        q_artist: artistName.toLowerCase(),
        track_isrc: isrc
    });

    return lyrics;
}


module.exports = {
    getRecommendedTrack,
    getDetail,
    getLyrics
}