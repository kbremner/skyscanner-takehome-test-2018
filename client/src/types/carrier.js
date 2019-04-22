import PropTypes from 'prop-types';

const carrier = PropTypes.shape({
  name: PropTypes.string.isRequired,
  faviconUrl: PropTypes.string.isRequried
});

export default carrier;