import PropTypes from 'prop-types';
import segment from './segment';
import carrier from './carrier';

export default PropTypes.shape({
  duration: PropTypes.number.isRequired,
  numStops: PropTypes.number.isRequired,
  segments: PropTypes.arrayOf(segment).isRequired,
  carrier: carrier.isRequired
});
