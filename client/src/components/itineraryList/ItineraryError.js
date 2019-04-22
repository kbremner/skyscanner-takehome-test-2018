import React from 'react';
import RefreshIcon from 'bpk-component-icon/lg/refresh';
import { withButtonAlignment, withRtlSupport } from 'bpk-component-icon';
import BpkText from 'bpk-component-text';
import BpkButton from 'bpk-component-button';
import PropTypes from '../../types';
import './ItineraryError.scss';

const AlignedRefreshIcon = withButtonAlignment(withRtlSupport(RefreshIcon));

const ItineraryError = ({ className, onRetry }) => (
  <div className={[className, 'itinerary-error'].join(' ')}>
    <BpkText className="itinerary-error__text" textStyle="xl">Something's gone wrong!</BpkText>
    <BpkButton className="itinerary-error__retry-btn" secondary large onClick={onRetry}>
      <span className="itinerary-error__retry-text">Retry</span>
      <AlignedRefreshIcon />
    </BpkButton>
  </div>
);

ItineraryError.propTypes = {
  onRetry: PropTypes.func.isRequired,
  className: PropTypes.string
};

ItineraryError.defaultProps = {
  className: null
};

export default ItineraryError;
