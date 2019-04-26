import React, { Component } from 'react';
import './Machine.css';
import ChangingButton from "./ChangingButton"
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import InfoIcon from '@material-ui/icons/Info'

function findTime()
{
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  if (today.getHours() < 12)
  {
    var sign = "A.M.";
  }
  else{
    var sign = "P.M.";
  }

  if (today.getHours() > 12)
  {
    var hour = today.getHours() - 12;
  }
  else if (today.getHours() == 0)
  {
    var hour = 12;
  }
  else
  {
    var hour = today.getHours();
  }

  if (today.getMinutes() < 10)
  {
    var minute = "0" + today.getMinutes();
  }
  else{
    var minute = today.getMinutes();
  }
  return date + " " + hour + ":" + minute + " " + sign;
}

class Machine extends Component {
  constructor(props) {
    super(props);
    localStorage.clear();

    var oldlog = "";
    var oldCheck = false;
    var oldUser = "";

    if (!(JSON.parse(localStorage.getItem('log' + this.props.id) == undefined)))
    {
      var oldlog = JSON.parse(localStorage.getItem('log' + this.props.id));
    }

    if (!(JSON.parse(localStorage.getItem('checkedOut' + this.props.id) == undefined)))
    {
      var oldCheck = JSON.parse(localStorage.getItem('checkedOut' + this.props.id));
    }

    if (!(JSON.parse(localStorage.getItem('user' + this.props.id) == undefined)))
    {
      var oldUser = JSON.parse(localStorage.getItem('user' + this.props.id));
    }

    this.state = {
      showPopup: false, 
      showCheckin: false,
      logs: oldlog,
      checkedOut: oldCheck,
      user: oldUser,
      id: this.props.id,
    };

    this.togglePopup = this.togglePopup.bind(this);
    this.showLogs = this.showLogs.bind(this);

    this.closePopup = this.closePopup.bind(this);
  }

  closePopup()
  {
    this.setState(
      {
        showCheckin: false,
      }
    );
  }
  
  togglePopup() {
    if (!this.state.checkedOut)
    {
      this.setState({
        showPopup: !this.state.showPopup
      });
    }
    else
    {
      //alert("Checking in")
      this.setState({
        showCheckin: !this.state.showCheckin
      });
    }
  }

  showLogs() {
    alert(this.state.logs)
  }

  render()
  {
      return (
      <tr className="Machine">
        <td className= "MName">{this.props.name}</td>
        <td className = "KeyBox">
        <ChangingButton id= {this.props.id} triggerParentUpdate= {this.togglePopup.bind(this)}></ChangingButton>
        {this.state.showPopup ? 
          <Checkout 
            id = {this.state.id}
            logs = {this.state.logs}
            checkedOut = {this.state.checkedOut}
            closePopup={this.togglePopup.bind(this)}
          />
          : null
        }
        {this.state.showCheckin ? 
          <Checkin 
            id = {this.state.id}
            logs = {this.state.logs}
            checkedOut = {this.state.checkedOut}
            closePopup={this.closePopup.bind(this)}
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
      id: this.props.id,
    };

    this.handleChangeUser = this.handleChangeUser.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }


  

  handleChangeUser(event) {
    this.setState({user: event.target.value});
  }

  handleSubmit(event) {
    if (this.state.user !== '')
    {

      localStorage.setItem("user" + this.state.id, JSON.stringify(this.state.user));
      
      var realCheck = !this.props.checkedOut;

      localStorage.setItem("checkedOut" + this.state.id, JSON.stringify(realCheck));
      

      var timestr = findTime();

      var pastLog = this.props.logs;
      
      if (realCheck)
      {
        var newLog =  pastLog + this.state.user + ": " + timestr + "  --  ";
        
      }
      else
      {
        var newLog = pastLog + timestr + "\n";

      }


      var itemName = 'log' + this.props.id;

      localStorage.setItem(itemName, JSON.stringify(newLog));
      localStorage.removeItem("user" + this.props.id);
        this.setState(
          {
            user: ""
          }
        );
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

class Checkin extends Machine {
  constructor(props) {
    super(props);
    this.state = 
    {
      time: '',
      id: this.props.id,
    };

    this.handleChangeTime = this.handleChangeTime.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeTime(event) {
    this.setState({time: event.target.value});
  }

  handleSubmit(event)
  {
    if (this.state.time !== '')
    {

      //localStorage.setItem("user" + this.state.id, JSON.stringify(this.state.user));
      
      var realCheck = !this.props.checkedOut;

      localStorage.setItem("checkedOut" + this.props.id, JSON.stringify(realCheck));
      

      var pastLog = this.props.logs;
      
      var newLog = pastLog + this.state.time + "\n";

      var itemName = 'log' + this.props.id;

      localStorage.setItem(itemName, JSON.stringify(newLog));
      
    }
    else if (this.state.time === '')
    {
      //alert("Please enter a user");
      //event.preventDefault();
      var realCheck = !this.props.checkedOut;

      localStorage.setItem("checkedOut" + this.props.id, JSON.stringify(realCheck));
      

      var timestr = findTime();
      alert(timestr);
      var pastLog = this.props.logs;
      
      var newLog = pastLog + timestr + "\n";

      var itemName = 'log' + this.props.id;

      localStorage.setItem(itemName, JSON.stringify(newLog));
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
            Check in time?
              <label className='UserBar'>
                
                <input type="text" value={this.state.time} onChange={this.handleChangeTime} />
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