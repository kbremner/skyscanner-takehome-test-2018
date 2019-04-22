import { RSAA } from 'redux-api-middleware';

import { searchUrl, nextPageUrl, searchPlacesUrl } from './selectors';

export const SEARCH_STARTED = 'SEARCH_STARTED';
export const SEARCH_SUCCESSFUL = 'SEARCH_SUCCESSFUL';
export const SEARCH_FAILED = 'SEARCH_FAILED';

export const FETCH_NEXT_PAGE = 'FETCH_NEXT_PAGE';
export const FETCH_NEXT_PAGE_SUCCESSFUL = 'FETCH_NEXT_PAGE_SUCCESSFUL';
export const FETCH_NEXT_PAGE_FAILED = 'FETCH_NEXT_PAGE_FAILED';

export const SEARCH_PLACES_STARTED = 'SEARCH_PLACES_STARTED';
export const SEARCH_PLACES_SUCCESSFUL = 'SEARCH_PLACES_SUCCESSFUL';
export const SEARCH_PLACES_FAILED = 'SEARCH_PLACES_FAILED';
export const CLEAR_PLACES = 'CLEAR_PLACES';
export const PLACE_SELECTED = 'PLACE_SELECTED';

export const search = () => ({
  [RSAA]: {
    endpoint: searchUrl,
    method: 'GET',
    types: [SEARCH_STARTED, SEARCH_SUCCESSFUL, SEARCH_FAILED]
  }
});

export const fetchNextPage = () => ({
  [RSAA]: {
    endpoint: nextPageUrl,
    method: 'GET',
    types: [FETCH_NEXT_PAGE, FETCH_NEXT_PAGE_SUCCESSFUL, FETCH_NEXT_PAGE_FAILED]
  }
});

export const searchForPlaces = (query) => ({
  [RSAA]: {
    endpoint: state => searchPlacesUrl(query, state),
    method: 'GET',
    types: [SEARCH_PLACES_STARTED, SEARCH_PLACES_SUCCESSFUL, SEARCH_PLACES_FAILED]
  }
});

export const clearPlaces = () => ({
  type: CLEAR_PLACES
});

export const placeSelected = (name, value) => ({
  type: PLACE_SELECTED,
  [name]: value
});
