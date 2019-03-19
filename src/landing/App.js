import React, { Component } from 'react';
import Table from './Table';
import LoginButton from './LoginButton';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className= "Wrapper">
        <div className="TopContainer">
          <div className="TopLeft">&nbsp;</div>
          <div className="Title">
            Machine Availability
            
          </div>
          <div className="TopRight">
            <LoginButton></LoginButton>
          </div>
        </div>
        <div className="BottomContainer">
          <Table></Table>
        </div>
        
      </div>
    );
  }
}

export default App;
