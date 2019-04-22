import React, { Component } from 'react';
import BpkAutosuggest, { BpkAutosuggestSuggestion } from 'bpk-component-autosuggest';
import PropTypes from '../../types';

const getSuggestionValue = ({ PlaceId }) => PlaceId.replace('-sky', '');

const renderSuggestion = ({ PlaceId, PlaceName, CountryName }) => (
  <BpkAutosuggestSuggestion
    value={`${PlaceName} (${PlaceId.replace('-sky', '')})`}
    subHeading={CountryName}
    tertiaryLabel="Airport"
  />
);

class PlaceAutocomplete extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.defaultValue
    };
  }

  onChange = (e, { newValue }) => {
    this.setState({
      value: newValue,
    });
  }

  onSuggestionsFetchRequested = ({ value }) => {
    this.props.onSearchForPlaces(value);
  }

  onSuggestionsClearRequested = () => {
    this.props.onClearPlaces();
  }

  onSuggestionSelected = (event, { suggestion }) => {
    this.props.onPlaceSelected(suggestion.PlaceId);
  }

  render() {
    const { value } = this.state;
    const { name, places } = this.props;

    const inputProps = {
      id: `place-search-${name}`,
      name,
      placeholder: 'Enter a place',
      value,
      onChange: this.onChange,
    };

    return <BpkAutosuggest
      suggestions={places}
      onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
      onSuggestionsClearRequested={this.onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      onSuggestionSelected={this.onSuggestionSelected}
      inputProps={inputProps}
    />
  }
}

PlaceAutocomplete.propTypes = {
  defaultValue: PropTypes.string,
  name: PropTypes.string.isRequired,
  places: PropTypes.arrayOf(PropTypes.place).isRequired,
  onSearchForPlaces: PropTypes.func.isRequired,
  onClearPlaces: PropTypes.func.isRequired,
  onPlaceSelected: PropTypes.func.isRequired
};

export default PlaceAutocomplete;
