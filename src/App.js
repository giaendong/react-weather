import React, { Component } from 'react';
import Routes from './config/routes';

class App extends Component {
  render() {
    return (
      <div className='main-body'>
        <Routes />
      </div>
    );
  }
}

export default App;