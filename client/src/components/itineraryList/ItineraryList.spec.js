import React from 'react';
import { shallow } from 'enzyme';
import { ItineraryList } from './ItineraryList';

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

const defaultItineraries = () => ([
  defaultItinerary('1'),
  defaultItinerary('2'),
  defaultItinerary('3'),
]);

const setup = (overrideProps = {}) => {
  const props = {
    itineraries: defaultItineraries(),
    error: false,
    loading: false,
    hasMorePages: true,
    search: jest.fn(),
    fetchNextPage: jest.fn(),
    ...overrideProps
  };
  const wrapper = shallow(<ItineraryList {...props} />);
  return { wrapper, props };
};

describe('ItineraryList', () => {
  describe('error', () => {
    it('is not rendered when error prop is false', () => {
      const { wrapper } = setup({ error: false });
      expect(wrapper.find('ItineraryError').length).toBe(0);
    });
  
    it('renders when error prop is true', () => {
      const { wrapper } = setup({ error: true });
      expect(wrapper).toMatchSnapshot();
    });
  
    it('calls provided handler when retrying', () => {
      const { wrapper, props } = setup({ error: true });
      props.search.mockClear();
      wrapper.find('ItineraryError').simulate('retry');
      expect(props.search).toHaveBeenCalledTimes(1);
    });
  });

  describe('spinner', () => {
    it('does not render when not fetching results', () => {
      const { wrapper } = setup({ loading: false });
      expect(wrapper.find('BpkExtraLargeSpinner').length).toBe(0);
    });
  
    it('renders when fetching results', () => {
      const { wrapper } = setup({ loading: true });
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('waypoint', () => {
    it('does not render when there is an error', () => {
      const { wrapper } = setup({ error: true });
      expect(wrapper.find('Waypoint').length).toBe(0);
    });
  
    it('does not render when loading', () => {
      const { wrapper } = setup({ loading: true });
      expect(wrapper.find('Waypoint').length).toBe(0);
    });
  
    it('does not render when there are no more pages', () => {
      const { wrapper } = setup({ hasMorePages: false });
      expect(wrapper.find('Waypoint').length).toBe(0);
    });
  
    it('does not render when there are no itineraries', () => {
      const { wrapper } = setup({ hasMorePages: true, itineraries: [] });
      expect(wrapper.find('Waypoint').length).toBe(0);
    });
  
    it('calls provided handler when Waypoint enters viewport', () => {
      const { wrapper, props } = setup({ hasMorePages: true });
      wrapper.find('Waypoint').simulate('enter');
      expect(props.fetchNextPage).toHaveBeenCalledTimes(1);
    });
  });

  describe('itineraries', () => {
    it('do not render when there is an error', () => {
      const { wrapper } = setup({ error: true });
      expect(wrapper.find('ItineraryCard').length).toBe(0);
    });

    it('renders empty message when there are no itineraries and not loading', () => {
      const { wrapper } = setup({ loading: false, itineraries: [] });
      expect(wrapper).toMatchSnapshot();
    });

    it('renders when there are itineraries', () => {
      const { wrapper } = setup();
      expect(wrapper).toMatchSnapshot();
    });

    it('renders when there are itineraries and is loading', () => {
      const { wrapper } = setup({ loading: true });
      expect(wrapper).toMatchSnapshot();
    });
  });

  it('calls search when mounted', () => {
    const { wrapper, props } = setup({ error: true });
    expect(props.search).toHaveBeenCalledTimes(1);
  });
});
