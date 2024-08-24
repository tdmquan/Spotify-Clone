/**
 * @license Apache-2.0
 * @copyright manhquan 2024
 */

'use strict';


/**
 * node modules
 */
const axios = require('axios').default;
const querystring = require('querystring');


/**
 * custom modules
 */
const apiConfig = require('./api.config');


/**
 * axios instance for access token and refresh token request
 */
const token = axios.create({
    baseURL: apiConfig.TOKEN_BASE_URL,
    headers: {
        'Authorization': `Basic ${(Buffer.from(apiConfig.CLIENT_ID + ':' + apiConfig.CLIENT_SECRET).toString('base64'))}`,
        'Content-Type': 'application/x-www-form-urlencoded'
    }
});


/**
 * axios instance for all api request
 */
const api = axios.create({ baseURL: apiConfig.BASE_URL });

/**
 * Fetch data from an API using an access token for authentication.
 * 
 * @param {string} apiUrl - The URL of the API endpoint to request data from
 * @param {string} access_token - The access token used for authentication.
 * @returns {Promise} A Promise that resolves with the response from the API or rejects with an error if the request fails.
 */
const getData = async (apiUrl, access_token) => {
    try {
        const /** {Promise} */ response = await api.get(apiUrl, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        });
        return response;
    } catch (err) {
        console.log(err);
    }
}


/**
 * axios instance for track lyrics request in Musixmatch
 */
const musixmatch = axios.create({ baseURL: apiConfig.MUSIXMATCH_BASE_URL });


/**
 * Makes an asynchronous request to the Musixmatch API with the specified endpoint and parameters
 * 
 * @param {string} endpoint - The Api endpoint to be appended to the base URL.
 * @param {*} parameters - The parameters to be included in the API request.
 * @returns {Promise<Object>} - A promise that resolves to the response data from the Musixmatch API
 */
const musixmatchApi = async (endpoint, parameters) => {
    try {
        
        const apiUrl = `${endpoint}${querystring.stringify(parameters)}&apikey=${apiConfig.MUSIXMATCH_API_KEY}`;
        const response = await musixmatch.get(apiUrl);
        return response.data;

    } catch (err) {
        console.log(err);
    }
}


module.exports = {
    token,
    getData,
    musixmatchApi
}