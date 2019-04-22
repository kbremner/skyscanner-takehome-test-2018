import React from 'react';
import BpkText from 'bpk-component-text';
import BpkSmallLongArrowRight from 'bpk-component-icon/sm/long-arrow-right';
import PropTypes from '../../types';
import './ItineraryLeg.scss';

const formatDuration = duration => {
  const numHours = Math.floor(duration / 60);
  const numMinutes = duration % 60;
  if (numMinutes === 0) {
    return `${numHours}h`;
  }
  if (numHours === 0) {
    return `${numMinutes}m`;
  }
  return `${numHours}h ${numMinutes}`;
}

const formatNumStops = numStops => numStops === 0
  ? 'Direct'
  : `${numStops} Stop${numStops === 1 ? '' : 's'}`;

const formatTime = dateTimeStr => {
  const dateTime = new Date(dateTimeStr);
  return [dateTime.getHours(), dateTime.getMinutes()]
    .map(timeComponent => `${timeComponent < 10 ? '0' : ''}${timeComponent}`)
    .join(':');
}

const Segment = ({ dateTime, code }) => (
  <div className="itinerary-leg__segment">
    <BpkText>{formatTime(dateTime)}</BpkText>
    <BpkText className="itinerary-leg__location">{code}</BpkText>
  </div>
);

const ItineraryLeg = ({ className, carrier, segments, duration, numStops }) => (
  <div className={[className, 'itinerary-leg'].join(' ')}>
    <div>
      <img
        className="itinerary-leg__airline-logo"
        alt={`${carrier.name} logo`}
        src={carrier.faviconUrl}
      />
    </div>
    
    <div className="itinerary-leg__segments">
      {segments.map(({ origin, destination }, i, allSegments) => {
        const elems = [
          <Segment dateTime={origin.dateTime} code={origin.code} key={origin.code} />,
          <BpkSmallLongArrowRight className="itinerary-leg__arrow" key={`arrow-${i}`} />
        ];
        if (i === (allSegments.length - 1)) {
          // last segment, include destination
          elems.push(<Segment dateTime={destination.dateTime} code={destination.code} key={destination.code} />);
        }
        return elems;
      })}
    </div>

    <div className="itinerary-leg__summary">
      <BpkText className="itinerary-leg__duration">{formatDuration(duration)}</BpkText>
      <BpkText className="itinerary-leg__num-stops">{formatNumStops(numStops)}</BpkText>
    </div>
  </div>
);

ItineraryLeg.propTypes = {
  carrier: PropTypes.carrier.isRequired,
  segments: PropTypes.arrayOf(PropTypes.segment).isRequired,
  duration: PropTypes.number.isRequired,
  numStops: PropTypes.number.isRequired,
  className: PropTypes.string,
};

ItineraryLeg.defaultProps = {
  className: null
};

export default ItineraryLeg;