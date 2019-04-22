import React from 'react';
import BpkButton from 'bpk-component-button';
import BpkLargeMenuIcon from 'bpk-component-icon/lg/menu';
import PropTypes from '../../types';
import logo from './logo.svg';
import './TopNav.scss';

const TopNav = ({ onMenuClick }) => (
  <header className='topnav'>
    <a href="/">
      <span className='topnav__logo-text'>Skyscanner</span>
      <img className='topnav__icon-logo' alt="Skyscanner" src={logo} />
    </a>
    <BpkButton className="topnav__btn-menu" link onClick={onMenuClick}>
      <BpkLargeMenuIcon className="topnav__icon-menu" />
    </BpkButton>
  </header>
);

TopNav.propTypes = {
  onMenuClick: PropTypes.func.isRequired
};

export default TopNav;
