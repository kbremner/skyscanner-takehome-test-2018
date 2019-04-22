import PropTypes from 'prop-types';
import Leg from './leg';

export default PropTypes.shape({
  price: PropTypes.string.isRequired,
  agentName: PropTypes.string.isRequired,
  bookingLink: PropTypes.string.isRequired,
  legs: PropTypes.arrayOf(Leg).isRequired
});
