import React, { Component } from 'react';
import Table from './Table';
import LoginButton from './LoginButton';
import './App.css';

class Login extends React.Component {
  render() {
    return (
      <div className='Login'>
        <div className='Login_inner'>
          <div className='Close_bar'>
            <button className ='closer' onClick={this.props.closePopup}>X</button>
          </div>
          <div className ='IDEntry'>
            <form>
              <label>
                User ID:
                <input type="text" name="name" />
              </label>
              <input type="submit" value="Submit" />
            </form>
          </div>

        </div>
 
      </div>
    );
  }
}

class App extends Component {
  
  constructor() {
    super();
    this.state = {
      showPopup: false
    };
  }
  
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  render() {

    return (
      <div className= "Wrapper">
        <div className="TopContainer">
          <div className="TopLeft">&nbsp;</div>
          <div className="Title">
            Machine Availability
            
          </div>
          <div className="TopRight">
            {/*<LoginButton></LoginButton>*/}
            <button variant ='outline-danger' className ='logButton' onClick={this.togglePopup.bind(this)}>LOGIN</button>
            {this.state.showPopup ? 
              <Login
                
                closePopup={this.togglePopup.bind(this)}
              />
              : null
        }
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
