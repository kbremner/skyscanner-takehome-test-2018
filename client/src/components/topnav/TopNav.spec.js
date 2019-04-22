import React from 'react';
import { shallow } from 'enzyme';
import TopNav from './TopNav';

const setup = () => {
  const onMenuClick = jest.fn();
  const wrapper = shallow(<TopNav onMenuClick={onMenuClick} />);
  return { wrapper, onMenuClick };
};

describe('TopNav', () => {
  it('renders', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('calls handler when menu button clicked', () => {
    const { wrapper, onMenuClick } = setup();
    wrapper.find('.topnav__btn-menu').simulate('click');
    expect(onMenuClick).toHaveBeenCalledTimes(1);
  });
});
