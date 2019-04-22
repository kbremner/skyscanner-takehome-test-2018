import React from 'react';
import { shallow } from 'enzyme';
import PlaceAutocomplete from './PlaceAutocomplete';

const createPlaces = size => Array.apply(null, Array(size))
  .map((val, i) => ({
    PlaceId: `test-place-id-${i}`,
    PlaceName: `test-place-name-${i}`,
    CountryName: `test-country-name-${i}`
  }));

const defaultProps = () => ({
  name: 'test-place-autocomplete',
  places: [],
  onSearchForPlaces: jest.fn(),
  onClearPlaces: jest.fn(),
  onPlaceSelected: jest.fn()
});

const setup = (overrideProps = {}) => {
  const props = {
    ...defaultProps(),
    ...overrideProps
  };
  const wrapper = shallow(<PlaceAutocomplete {...props} />);
  return { wrapper, props };
}

describe('PlaceAutocomplete', () => {
  it('renders', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders with default value', () => {
    const { wrapper } = setup({ defaultValue: 'test-default' });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders with results', () => {
    const { wrapper } = setup({ places: createPlaces(2) });
    expect(wrapper).toMatchSnapshot();
  });

  it('calls handler when suggestions fetch requested', () => {
    const value = Symbol('test-value');
    const { wrapper, props } = setup();
    const { onSearchForPlaces } = props;
    wrapper.find('Autosuggest').simulate('suggestionsFetchRequested', { value });
    expect(onSearchForPlaces).toHaveBeenCalledTimes(1);
    expect(onSearchForPlaces).toHaveBeenCalledWith(value);
  });

  it('calls handler when clearing of suggestions is requested', () => {
    const { wrapper, props } = setup();
    const { onClearPlaces } = props;
    wrapper.find('Autosuggest').simulate('suggestionsClearRequested');
    expect(onClearPlaces).toHaveBeenCalledTimes(1);
  });

  it('calls handler when suggestion selected', () => {
    const suggestion = { PlaceId: Symbol('test-place-id') };
    const { wrapper, props } = setup();
    const { onPlaceSelected } = props;
    wrapper.find('Autosuggest').simulate('suggestionSelected', null, { suggestion });
    expect(onPlaceSelected).toHaveBeenCalledTimes(1);
    expect(onPlaceSelected).toHaveBeenCalledWith(suggestion.PlaceId);
  });
});
