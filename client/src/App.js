import React, { Component } from 'react';
import './App.scss';

import TopNav from './components/topnav';
import Header from './components/header';
import SearchControls from './components/searchControls';
import ItineraryList from './components/itineraryList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <TopNav onMenuClick={() => console.log('menu')} />
        <Header />
        <SearchControls
          onFilterClick={() => console.log('filter')}
          onSortClick={() => console.log('sort')}
          onPriceAlertsClick={() => console.log('price alerts')}
        />
        <ItineraryList />
      </div>
    );
  }
}

export default App;
