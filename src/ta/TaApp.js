import React, { Component } from 'react';
import TaTable from './TaTable';
import LoginButton from '../landing/LoginButton';
import './TaApp.css';

class TaApp extends Component {
  render() {
    return (
      <div className= "Wrapper">
        <div className="TopContainer">
          <div className="TopLeft">&nbsp;</div>
          <div className="Title">
            {this.props.title}
          </div>
          <div className="TopRight">
            <LoginButton text="LOGOUT"></LoginButton>
          </div>
        </div>
        <div className="BottomContainer">
          <TaTable></TaTable>
        </div>
        
      </div>
    );
  }
}

export default TaApp;
