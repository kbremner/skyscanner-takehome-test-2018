import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchForPlaces, clearPlaces, placeSelected, search } from '../../store/actions';
import { places, origin, destination, numTravellers, cabinClass } from '../../store/selectors';
import BpkLargeLongArrowRight from 'bpk-component-icon/lg/long-arrow-right';
import BpkText from 'bpk-component-text';
import BpkButton from 'bpk-component-button';
import { withDefaultProps } from 'bpk-react-utils';
import PropTypes from '../../types';
import PlaceAutocomplete from './PlaceAutocomplete';
import './Header.scss';

const PlaceText = withDefaultProps(BpkText, { textStyle: 'xxl' });

export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editable: false
    };
  }

  handleSearch = () => {
    this.setState(() => ({ editable: false }));
    this.props.search();
  }

  renderEditable() {
    const { origin, destination, places, searchForPlaces, clearPlaces, placeSelected } = this.props;
    return (<div className="header__options">
      <PlaceAutocomplete
        name="fromPlace"
        defaultValue={origin}
        places={places}
        onSearchForPlaces={searchForPlaces}
        onClearPlaces={clearPlaces}
        onPlaceSelected={placeId => placeSelected("fromPlace", placeId)}
      />
      <PlaceAutocomplete
        name="toPlace"
        defaultValue={destination}
        places={places}
        onSearchForPlaces={searchForPlaces}
        onClearPlaces={clearPlaces}
        onPlaceSelected={placeId => placeSelected("toPlace", placeId)}
      />
      <BpkButton className="header__submit-btn" onClick={this.handleSearch}>Go!</BpkButton>
      <BpkButton
        secondary
        className="header__close-btn"
        onClick={() => this.setState(() => ({ editable: false }))}
      >
        Close
      </BpkButton>
    </div>);
  }

  renderNonEditable() {
    const { origin, destination, numTravellers, cabinClass } = this.props;
    return (<div
      aria-label="edit search options"
      tabIndex={0}
      role="button"
      onKeyPress={({ key }) => key === 'Enter' ? this.setState(() => ({ editable: true })) : null}
      onClick={() => this.setState(() => ({ editable: true }))}
    >
      <div className="header__route">
        <PlaceText className="header__place">{origin}</PlaceText>
        <BpkLargeLongArrowRight className="header__arrow" />
        <PlaceText className="header__place">{destination}</PlaceText>
      </div>
     <BpkText className="header__details">{numTravellers} travellers, {cabinClass}</BpkText>
    </div>);
  }

  render() {
    const { editable } = this.state;
    return (<div className="header">
      {editable && this.renderEditable()}
      {!editable && this.renderNonEditable()}
    </div>);
  }
}

Header.propTypes = {
  origin: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired,
  numTravellers: PropTypes.number.isRequired,
  cabinClass: PropTypes.cabinClass.isRequired,
  places: PropTypes.arrayOf(PropTypes.place).isRequired,
  searchForPlaces: PropTypes.func.isRequired,
  clearPlaces: PropTypes.func.isRequired,
  placeSelected: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    places: places(state),
    origin: origin(state),
    destination: destination(state),
    numTravellers: numTravellers(state),
    cabinClass: cabinClass(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    searchForPlaces: (query) => dispatch(searchForPlaces(query)),
    clearPlaces: () => dispatch(clearPlaces()),
    placeSelected: (name, value) => dispatch(placeSelected(name, value)),
    search: () => dispatch(search())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
