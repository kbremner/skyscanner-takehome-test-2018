import React from 'react';
import { shallow } from 'enzyme';
import ItineraryLeg from './ItineraryLeg';

const defaultProps = () => ({
  id: '1',
  carrier: {
    name: 'easyjet',
    code: 'EZ'
  },
  duration: 210,
  numStops: 0,
  segments: [11, 12, 13, 14].map(val => ({
    origin: {
      dateTime: `${val}:00`, code: `CODE-${val}`
    },
    destination: {
      dateTime: `${val+1}:00`, code: `CODE-${val+1}`
    }
  }))
});

const setup = (overrides = {}) => {
  const props = {
    ...defaultProps(),
    ...overrides
  };

  const wrapper = shallow(<ItineraryLeg {...props} />);

  return { wrapper, props };
};

describe('ItineraryLeg', () => {
  it('renders', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('adds class name to card provided', () => {
    const { wrapper, props } = setup({ className: 'test-class-name' });
    expect(wrapper.hasClass(props.className)).toBe(true);
  });

  it('renders just minutes when duration is less than 1h', () => {
    const { wrapper } = setup({ duration: 59 });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders just hours when duration has no minutes component', () => {
    const { wrapper } = setup({ duration: 180 });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders stops correctly when just 1', () => {
    const { wrapper } = setup({ numStops: 1 });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders stops correctly when more than 1', () => {
    const { wrapper } = setup({ numStops: 2 });
    expect(wrapper).toMatchSnapshot();
  });
});
