import React from 'react';
import { shallow } from 'enzyme';
import ItineraryError from './ItineraryError';

const defaultProps = () => ({
  onRetry: jest.fn()
});

const setup = (overrides = {}) => {
  const props = {
    ...defaultProps(),
    ...overrides
  };

  const wrapper = shallow(<ItineraryError {...props} />);

  return { wrapper, props };
};

describe('ItineraryError', () => {
  it('renders', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('adds class name to card provided', () => {
    const { wrapper, props } = setup({ className: 'test-class-name' });
    expect(wrapper.hasClass(props.className)).toBe(true);
  });

  it('calls retry handler when button is clicked', () => {
    const { wrapper, props } = setup();
    wrapper.find('BpkButton').simulate('click');
    expect(props.onRetry).toHaveBeenCalledTimes(1);
  })
});
