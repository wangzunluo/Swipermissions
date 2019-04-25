import React, { Component } from 'react';
import './Machine.css';
import ChangingButton from "./ChangingButton"
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import InfoIcon from '@material-ui/icons/Info'





class Machine extends Component {
  constructor(props) {
    super(props);
    //localStorage.clear();
    if (JSON.parse(localStorage.getItem('log' + this.props.id) == undefined))
    {
      //var color = JSON.parse(localStorage.getItem('green' + this.props.id));
      var oldlog = "";
    }
    else
    {
      var oldlog = JSON.parse(localStorage.getItem('log' + this.props.id));
    }

    if (JSON.parse(localStorage.getItem('checkedOut' + this.props.id) == undefined))
    {
      //var color = JSON.parse(localStorage.getItem('green' + this.props.id));
      var oldCheck = false;
    }
    else
    {
      var oldCheck = JSON.parse(localStorage.getItem('checkedOut' + this.props.id));
    }

    if (JSON.parse(localStorage.getItem('user' + this.props.id) == undefined))
    {
      //var color = JSON.parse(localStorage.getItem('green' + this.props.id));
      var oldUser = "";
    }
    else
    {
      var oldUser = JSON.parse(localStorage.getItem('user' + this.props.id));
    }

    this.state = {
      showPopup: false, 
      hasLoggedIn: false,
      logs: oldlog,
      checkedOut: oldCheck,
      user: oldUser,
      waiting: true,
    };

    this.togglePopup = this.togglePopup.bind(this);
    this.showLogs = this.showLogs.bind(this);

    this.checkOut = this.checkOut.bind(this);
  }
  
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  showLogs() {
    alert(this.state.logs)
  }

  checkOut()
  {
    if (!this.state.checkedOut)
    {
      this.togglePopup();
      this.setState(
        {
          waiting: true
        }
      );

      //try to prompt user
    }
    this.setState(
      {
        checkedOut: !this.state.checkedOut,
      },() => 
      {
        localStorage.setItem("checkedOut" + this.props.id, JSON.stringify(this.state.checkedOut))
        
      }
    )
    //alert("clicking");
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes(); 

    var pastLog = this.state.logs;
    while (this.state.waiting)
    {
      break;
    }
    if (!this.state.checkedOut)
    {
      var newLog = this.state.user + ": " + pastLog + date + " " + time + "  --  ";
      //localStorage.removeItem("user" + this.props.id);
      /*this.setState(
        {
          user: ""
        }
      );
      */
    }
    else
    {
      var newLog = pastLog + date + " " + time + "\n";

    }

    var itemName = 'log' + this.props.id;

    this.setState({logs: newLog},() => 
    {
      localStorage.setItem(itemName, JSON.stringify(this.state.logs))
      
    });

  }

  render()
  {
      return (
      <tr className="Machine">
        <td className= "MName">{this.props.name}</td>
        <td className = "KeyBox">
        <ChangingButton id= {this.props.id} triggerParentUpdate= {this.checkOut.bind(this)}></ChangingButton>
        {this.state.showPopup ? 
                <Checkout id = {this.props.id}
                    
                    closePopup={this.togglePopup.bind(this)}
                />
                : null
                }
        </td>
        <td className = "InfoBox">
        <div className = 'Fourth'>        
          <Fab size="small" color = "primary" className ='Info' onClick={this.showLogs.bind(this)} >
          <InfoIcon className = 'Icon2' />
          </Fab>
        </div>
        </td>
        <td className = "AddBox">
        <div className = 'Third'>        
          <Fab size="small" color = "primary" className ='Add'>
          <AddIcon/>
          </Fab>
        </div>
        </td>
        
      </tr>
    )
  }
}

class Checkout extends Machine {
  constructor(props) {
    super(props);
    this.state = 
    {
      user: '',
      password: '',
      id: this.props.id,
    };

    this.handleChangeUser = this.handleChangeUser.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }




  handleChangeUser(event) {
    this.setState({user: event.target.value});
  }

  handleChangePassword(event) {
    this.setState({password: event.target.value});
  }

  handleSubmit(event) {
    if (this.state.user !== '')
    {
      
      alert('A name was submitted: ' + this.state.user + this.state.id);
      super.setState(
        {
          user: this.state.user,
        },() => 
        {
          localStorage.setItem("user" + this.state.id, JSON.stringify(this.state.user))
          
        }
      );
      super.setState({
        waiting: false,
      });
      
    }
    else if (this.state.user === '')
    {
      alert("Please enter a user");
      event.preventDefault();
    }
  }

  render() {
    return (
      <div className='Login'>
        <div className='Login_inner'>
          <div className='Close_bar'>
            <button className ='closer' onClick={this.props.closePopup}>X</button>
          </div>
          
          <div className ='SignIn'>
            <form className='SignForm' onSubmit={this.handleSubmit}>
            Check out to?
              <label className='UserBar'>
                
                <input type="text" value={this.state.user} onChange={this.handleChangeUser} />
              </label>
              <input type="submit" value="Submit" />
            </form>
          </div>

        </div>
 
      </div>
    );
  }
}
export default Machine