import PropTypes from 'prop-types';

const station = PropTypes.shape({
  dateTime: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired
})

const segment = PropTypes.shape({
  origin: station.isRequired,
  destination: station.isRequired
});

export default segment;