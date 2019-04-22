import React from 'react';
import { shallow } from 'enzyme';
import { Header } from './Header';

const defaultProps = () => ({
  origin: 'test-origin',
  destination: 'test-destination',
  numTravellers: 4,
  cabinClass: 'first',
  places: [],
  searchForPlaces: jest.fn(),
  clearPlaces: jest.fn(),
  placeSelected: jest.fn(),
  search: jest.fn()
});

const setup = (overrideProps = {}) => {
  const props = {
    ...defaultProps(),
    ...overrideProps
  };
  const wrapper = shallow(<Header {...props} />);
  return { wrapper, props };
};

describe('Header', () => {
  it('renders non-editable view', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders editable view when non-editable view is clicked', () => {
    const { wrapper } = setup();
    wrapper.find({ role: 'button' }).simulate('click');
    expect(wrapper).toMatchSnapshot();
  });

  it('renders editable view when press enter on non-editable view', () => {
    const { wrapper } = setup();
    wrapper.find({ role: 'button' }).simulate('keyPress', { key: 'Enter' });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders non-editable view when close button is clicked', () => {
    const { wrapper } = setup();
    wrapper.find({ role: 'button' }).simulate('click');
    wrapper.find('.header__close-btn').simulate('click');
    expect(wrapper).toMatchSnapshot();
  });

  it('renders non-editable view when go button is clicked', () => {
    const { wrapper } = setup();
    wrapper.find({ role: 'button' }).simulate('click');
    wrapper.find('.header__submit-btn').simulate('click');
    expect(wrapper).toMatchSnapshot();
  });

  it('triggers search when go button is clicked', () => {
    const { wrapper, props } = setup();
    const { search } = props;
    wrapper.find({ role: 'button' }).simulate('click');
    wrapper.find('.header__submit-btn').simulate('click');
    expect(search).toHaveBeenCalledTimes(1);
  });

  it('updates fromPlace when from place is selected', () => {
    const placeId = Symbol('test-place-id');
    const { wrapper, props } = setup();
    const { placeSelected } = props;
    wrapper.find({ role: 'button' }).simulate('click');
    wrapper.find({ name: 'fromPlace' }).simulate('placeSelected', placeId);
    expect(placeSelected).toHaveBeenCalledTimes(1);
    expect(placeSelected).toHaveBeenCalledWith('fromPlace', placeId);
  });

  it('clears places when triggered from from place autocomplete', () => {
    const { wrapper, props } = setup();
    const { clearPlaces } = props;
    wrapper.find({ role: 'button' }).simulate('click');
    wrapper.find({ name: 'fromPlace' }).simulate('clearPlaces');
    expect(clearPlaces).toHaveBeenCalledTimes(1);
  });

  it('calls places search when triggered from from place autocomplete', () => {
    const value = Symbol('test-value');
    const { wrapper, props } = setup();
    const { searchForPlaces } = props;
    wrapper.find({ role: 'button' }).simulate('click');
    wrapper.find({ name: 'fromPlace' }).simulate('searchForPlaces', value);
    expect(searchForPlaces).toHaveBeenCalledTimes(1);
    expect(searchForPlaces).toHaveBeenCalledWith(value);
  });

  it('updates toPlace when from place is selected', () => {
    const placeId = Symbol('test-place-id');
    const { wrapper, props } = setup();
    const { placeSelected } = props;
    wrapper.find({ role: 'button' }).simulate('click');
    wrapper.find({ name: 'toPlace' }).simulate('placeSelected', placeId);
    expect(placeSelected).toHaveBeenCalledTimes(1);
    expect(placeSelected).toHaveBeenCalledWith('toPlace', placeId);
  });

  it('clears places when triggered from to place autocomplete', () => {
    const { wrapper, props } = setup();
    const { clearPlaces } = props;
    wrapper.find({ role: 'button' }).simulate('click');
    wrapper.find({ name: 'toPlace' }).simulate('clearPlaces');
    expect(clearPlaces).toHaveBeenCalledTimes(1);
  });

  it('calls places search when triggered from to place autocomplete', () => {
    const value = Symbol('test-value');
    const { wrapper, props } = setup();
    const { searchForPlaces } = props;
    wrapper.find({ role: 'button' }).simulate('click');
    wrapper.find({ name: 'toPlace' }).simulate('searchForPlaces', value);
    expect(searchForPlaces).toHaveBeenCalledTimes(1);
    expect(searchForPlaces).toHaveBeenCalledWith(value);
  });
});
