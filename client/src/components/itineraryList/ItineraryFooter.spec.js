import React from 'react';
import { shallow } from 'enzyme';
import ItineraryFooter from './ItineraryFooter';

const defaultProps = {
  className: null,
  price: '$234.45',
  agentName: 'test agent',
  bookingLink: 'http://example.com'
};

const setup = (overrides = {}) => {
  const props = {
    ...defaultProps,
    ...overrides
  };

  const wrapper = shallow(<ItineraryFooter {...props} />);

  return { wrapper, props };
};

describe('ItineraryFooter', () => {
  it('renders', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('adds class name to card provided', () => {
    const { wrapper, props } = setup({ className: 'test-class-name' });
    expect(wrapper.hasClass(props.className)).toBe(true);
  });
});
