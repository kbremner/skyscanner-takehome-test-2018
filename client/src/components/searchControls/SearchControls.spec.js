import React from 'react';
import { shallow } from 'enzyme';
import SearchControls from './SearchControls';

const setup = (query = null) => {
  const filter = jest.fn();
  const sort = jest.fn();
  const priceAlerts = jest.fn();

  let wrapper = shallow(<SearchControls
    onFilterClick={filter}
    onSortClick={sort}
    onPriceAlertsClick={priceAlerts}
  />);
  if (query) {
    wrapper = wrapper.find(query);
  }

  return { filter, sort, priceAlerts, wrapper };
};

describe('SearchControls', () => {
  it('renders', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('calls provided handler when filter is clicked', () => {
    const { wrapper, filter } = setup('.search-controls__filter');
    wrapper.simulate('click');
    expect(filter).toHaveBeenCalledTimes(1);
  });

  it('calls provided handler when sort is clicked', () => {
    const { wrapper, sort } = setup('.search-controls__sort');
    wrapper.simulate('click');
    expect(sort).toHaveBeenCalledTimes(1);
  });

  it('calls provided handler when price alerts is clicked', () => {
    const { wrapper, priceAlerts } = setup('.search-controls__alerts');
    wrapper.simulate('click');
    expect(priceAlerts).toHaveBeenCalledTimes(1);
  });
});