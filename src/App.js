import React, { Component } from 'react';
import Table from './Table';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <div className="TopContainer">
          <div className="Title">Machine Availability</div>
        </div>
        <Table></Table>
      </div>
    );
  }
}

export default App;
