import React from 'react';
import BpkText from 'bpk-component-text';
import BpkButton from 'bpk-component-button';
import PropTypes from '../../types';
import './ItineraryFooter.scss';

const ItineraryFooter = ({ className, price, agentName, bookingLink }) => (
  <div className={[className, 'itinerary-footer'].join(' ')}>
      <div className="itinerary-footer__quote">
        <BpkText className="itinerary-footer__price" textStyle="xl">{price}</BpkText>
        <BpkText className="itinerary-footer__agent">{agentName}</BpkText>
      </div>
      <BpkButton href={bookingLink} target="_blank">Select</BpkButton>
    </div>
);

ItineraryFooter.propTypes = {
  price: PropTypes.string.isRequired,
  agentName: PropTypes.string.isRequired,
  bookingLink: PropTypes.string.isRequired,
  className: PropTypes.string
};

ItineraryFooter.defaultProps = {
  className: null
};

export default ItineraryFooter;
