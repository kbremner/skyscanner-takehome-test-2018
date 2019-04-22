import React from 'react';
import BpkPanel from 'bpk-component-panel';
import PropTypes from '../../types';
import ItineraryLeg from './ItineraryLeg';
import ItineraryFooter from './ItineraryFooter';
import './ItineraryCard.scss';

const ItineraryCard = ({ className, itinerary }) => (
  <BpkPanel className={[className, "itinerary-card"].join(' ')}>
    {itinerary.legs.map(({ id, carrier, duration, numStops, segments }) => (
      <ItineraryLeg
        key={id}
        className="itinerary-card__leg"
        carrier={carrier}
        duration={duration}
        numStops={numStops}
        segments={segments}
      />
    ))}
    <ItineraryFooter
      className="itinerary-card__footer"
      price={itinerary.price}
      agentName={itinerary.agentName}
      bookingLink={itinerary.bookingLink}
    />
  </BpkPanel>
);

ItineraryCard.propTypes = {
  itinerary: PropTypes.itinerary.isRequired,
  className: PropTypes.string
};

ItineraryCard.defaultProps = {
  className: null
};

export default ItineraryCard;