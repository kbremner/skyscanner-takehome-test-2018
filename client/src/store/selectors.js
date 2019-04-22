const formatNumber = num => num > 10 ? num.toString() : `0${num}`;
const formatDate = date => `${date.getFullYear()}-${formatNumber(date.getMonth() + 1)}-${formatNumber(date.getDate())}`;

export const searchUrl = state =>
  `${state.baseUrl}search?class=${state.cabinClass}&adults=${state.adults}` +
    `&toPlace=${state.toPlace}&toDate=${formatDate(state.toDate)}` +
    `&fromPlace=${state.fromPlace}&fromDate=${formatDate(state.fromDate)}`;
export const nextPageUrl = state => state.nextPageUrl;
export const itineraries = state => state.itineraries;
export const loading = state => state.loading;
export const error = state => state.error;
export const hasMorePages = state => !!state.nextPageUrl;
export const origin = state => state.fromPlace.replace('-sky', '');
export const destination = state => state.toPlace.replace('-sky', '');
export const numTravellers = state => state.adults;
export const cabinClass = state => state.cabinClass;

export const searchPlacesUrl = (query, { baseUrl }) =>
  `${baseUrl}places?query=${query}`;
export const placesLoading = state => state.placesLoading;
export const placesError = state => state.placesError;
export const places = state => state.places;