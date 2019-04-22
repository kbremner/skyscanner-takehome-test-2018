import createReducer from './createReducer';
import { SEARCH_STARTED, SEARCH_FAILED, SEARCH_SUCCESSFUL,
  FETCH_NEXT_PAGE, FETCH_NEXT_PAGE_FAILED, FETCH_NEXT_PAGE_SUCCESSFUL,
  SEARCH_PLACES_STARTED, SEARCH_PLACES_FAILED, SEARCH_PLACES_SUCCESSFUL,
  CLEAR_PLACES, PLACE_SELECTED } from './actions';

const MONDAY_DAY_OF_WEEK = 1;
const DAYS_IN_WEEK = 7;
const today = new Date();
const daysToNextMonday = (MONDAY_DAY_OF_WEEK + DAYS_IN_WEEK - today.getDay()) % DAYS_IN_WEEK;
const nextMonday = new Date(today);
nextMonday.setDate(nextMonday.getDate() + (daysToNextMonday > 0 ? daysToNextMonday : DAYS_IN_WEEK));

const dayAfter = new Date(nextMonday);
dayAfter.setDate(dayAfter.getDate() + 1);

export default createReducer({
  itineraries: [],
  nextBaseUrl: null,
  error: false,
  loading: false,
  baseUrl: 'http://localhost:4000/api/',
  cabinClass: 'economy',
  adults: 2,
  toPlace: 'LOND-sky',
  toDate: dayAfter,
  fromPlace: 'EDI-sky',
  fromDate: nextMonday,
  placesloading: false,
  placesError: false,
  places: []
}, {
  [SEARCH_STARTED]: (state, { error }) => ({
    ...state,
    itineraries: [],
    nextPageUrl: null,
    loading: !error,
    error: !!error
  }),
  [SEARCH_FAILED]: state => ({
    ...state,
    loading: false,
    error: true
  }),
  [SEARCH_SUCCESSFUL]: (state, { payload = {} }) => ({
    ...state,
    loading: false,
    itineraries: state.itineraries.concat(payload.itineraries || []),
    nextPageUrl: payload.nextPageUrl
  }),
  [FETCH_NEXT_PAGE]: (state, { error }) => ({
    ...state,
    loading: !error,
    error: !!error
  }),
  [FETCH_NEXT_PAGE_FAILED]: state => ({
    ...state,
    loading: false,
    error: true
  }),
  [FETCH_NEXT_PAGE_SUCCESSFUL]: (state, { payload = {} }) => ({
    ...state,
    loading: false,
    itineraries: state.itineraries.concat(payload.itineraries || []),
    nextPageUrl: payload.nextPageUrl
  }),
  [SEARCH_PLACES_STARTED]: (state, { error }) => ({
    ...state,
    places: [],
    placesLoading: !error,
    placesError: !!error
  }),
  [SEARCH_PLACES_FAILED]: state => ({
    ...state,
    placesLoading: false,
    placesError: true
  }),
  [SEARCH_PLACES_SUCCESSFUL]: (state, { payload = {} }) => ({
    ...state,
    places: payload.Places || []
  }),
  [CLEAR_PLACES]: state => ({
    ...state,
    places: []
  }),
  [PLACE_SELECTED]: (state, { toPlace, fromPlace }) => ({
    ...state,
    toPlace: toPlace || state.toPlace,
    fromPlace: fromPlace || state.fromPlace
  })
});
