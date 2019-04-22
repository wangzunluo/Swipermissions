import React, { Component } from 'react';
import './Machine.css';
import ChangingButton from "./ChangingButton"
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';



class Machine extends Component {
  constructor() {
    super();
    this.state = {
      showPopup: false, 
      hasLoggedIn: false
    };
  }
  
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }
  render()
  {
      return (
      <tr className="Machine">
        <td className= "MName">{this.props.name}</td>
        <td className = "KeyBox">
        <ChangingButton></ChangingButton>
        </td>
        <div className = 'Third'>        
          <Fab size="small" color = "primary" className ='Add'>
          <AddIcon className = 'Icon' />
          </Fab>
        </div>
        
      </tr>
    )
  }
}

export default Machine