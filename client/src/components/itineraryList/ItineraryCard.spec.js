import React from 'react';
import { shallow } from 'enzyme';
import ItineraryCard from './ItineraryCard';

const defaultItinerary = (id) => ({
  price: '$123.45',
  agentName: `test agent`,
  bookingLink: `http://example.com/${id}`,
  legs: [
    {
      id: '1',
      carrier: {
        name: 'easyjet',
        code: 'EZ'
      },
      duration: 210,
      numStops: 0,
      segments: [11, 12, 13, 14].map(val => ({
        origin: {
          dateTime: `${val}:00`, code: `CODE-${id}-${val}`
        },
        destination: {
          dateTime: `${val+1}:00`, code: `CODE-${id}-${val+1}`
        }
      }))
    }
  ]
});

const setup = (itineraryOverrides = {}, className = null) => {
  const itinerary = {
    ...defaultItinerary('1'),
    ...itineraryOverrides
  };

  const onClick = jest.fn();

  const wrapper = shallow(<ItineraryCard
    className={className}
    itinerary={itinerary}
    onClick={onClick}
  />);

  return { wrapper, itinerary, className, onClick };
};

describe('ItineraryCard', () => {
  it('renders', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('adds class name to card provided', () => {
    const { wrapper, className } = setup({}, 'test-class-name');
    expect(wrapper.hasClass(className)).toBe(true);
  });
});
