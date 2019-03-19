import React, { Component } from 'react';
import Table from './Table';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className= "Wrapper">
        <div className="TopContainer">
          <div className="Title">Machine Availability</div>
        </div>
        <div className="BottomContainer">
          <Table></Table>
        </div>
        
      </div>
    );
  }
}

export default App;
