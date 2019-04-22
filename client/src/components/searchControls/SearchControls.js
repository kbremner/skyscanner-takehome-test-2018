import React from 'react';
import BpkSmallPriceAlertsIcon from 'bpk-component-icon/sm/price-alerts';
import BpkText from 'bpk-component-text';
import BpkButton from 'bpk-component-button';
import PropTypes from '../../types';
import './SearchControls.scss';

const SearchControls = ({ onFilterClick, onSortClick, onPriceAlertsClick }) => (
  <div className="search-controls">
    <BpkButton className="search-controls__filter" link onClick={onFilterClick}>Filter</BpkButton>
    <BpkButton className="search-controls__sort" link onClick={onSortClick}>Sort</BpkButton>
    <BpkButton className="search-controls__alerts" link onClick={onPriceAlertsClick}>
      <BpkSmallPriceAlertsIcon className="search-controls__alerts-icon" />
      <BpkText>Price alerts</BpkText>
    </BpkButton>
  </div>
);

SearchControls.propTypes = {
  onFilterClick: PropTypes.func.isRequired,
  onSortClick: PropTypes.func.isRequired,
  onPriceAlertsClick: PropTypes.func.isRequired,
}

export default SearchControls;
