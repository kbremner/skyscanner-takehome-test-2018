import PropTypes from 'prop-types';

export default PropTypes.shape({
  PlaceId: PropTypes.string.isRequired,
  PlaceName: PropTypes.string.isRequired,
  CountryName: PropTypes.string.isRequired
});
