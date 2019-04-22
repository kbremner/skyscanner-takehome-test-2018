/* eslint no-use-before-define:0 */
const _ = require('lodash');
const config = require('../config');
const querystring = require('querystring');

const placesUrl = config.skyscannerApi + 'apiservices/autosuggest/v1.0/UK/GBP/en-GB';

const places = {
  api: {
    search: (query) => {
      return fetch(placesUrl + `?apikey=${config.apiKey}&query=${query}`, {
        method: 'GET'
      })
    }
  }
};

places.search = (query) => {
  return new Promise((resolve, reject) => {
    places.api.search(query)
      .then((response) => resolve(response.json()))
      .catch(reject);
  });
}

module.exports = places;
