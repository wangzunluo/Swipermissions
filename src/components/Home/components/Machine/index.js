import React, { Component } from 'react';
import './index.css';
import ChangingButton from "../ChangingButton";
import {StudentTable} from "../StudentTable";
import {MiniStudentTable} from "../MiniStudentTable";

import Fab from '@material-ui/core/Fab';

import AddIcon from '@material-ui/icons/Add';
import InfoIcon from '@material-ui/icons/Info'

function findTime()
{
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var sign = "P.M.";
  var hour = today.getHours();
  var minute = today.getMinutes();

  if (today.getHours() < 12)
  {
    sign = "A.M.";
  }

  if (hour > 12)
  {
    hour = hour - 12;
  }
  else if (hour == 0)
  {
    hour = 12;
  }

  if (minute < 10)
  {
    minute = "0" + minute;
  }

  return date + " " + hour + ":" + minute + " " + sign;
}

class Machine extends Component {
  constructor(props) {
    super(props);
    //localStorage.clear();
    this.changingbutton = React.createRef()
    var oldlog = "";
    var oldCheck = false;
    var oldUser = "";

    if (!(this.props.logs === undefined))
    {
      oldlog = this.props.logs
    }

    oldCheck = this.props.available === 't' ? true : false

    
    oldUser = this.props.user
    


    this.state = {
      showPopup: false, 
      showCheckin: false,
      logs: oldlog,
      checkedOut: oldCheck,
      user: oldUser,
      id: this.props.id,
    };

    console.log(this.state)
    this.togglePopup = this.togglePopup.bind(this);
    this.showLogs = this.showLogs.bind(this);

    this.closePopup = this.closePopup.bind(this);
  }

  closePopup()
  {
    console.log("ASDFASD")
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
    this.setState({
      checkedOut: !this.state.checkedOut
    }) 
  }

  showLogs() {
    alert(this.state.logs)
  }

  myCallBack = () => {
    this.changingbutton.current.update()
  }

  render()
  {
      return (
      <tr className="Machine">
        <td className= "MName">{this.props.name}</td>
        <td className = "KeyBox">
        <ChangingButton ref={this.changingbutton} change={this.myCallBack} green = {this.state.checkedOut} id= {this.props.id} triggerParentUpdate= {this.togglePopup.bind(this) } ></ChangingButton>

        
        {this.state.showPopup ? 
          <Checkout 
            id = {this.state.id}
            name = {this.props.name}
            logs = {this.state.logs}
            checkedOut = {this.state.checkedOut}
            closePopup={this.togglePopup.bind(this)}
            myCallBack={this.myCallBack}
          />
          : null
        }
        {this.state.showCheckin ? 
          <Checkin 
            id = {this.state.id}
            name = {this.props.name}
            logs = {this.state.logs}
            checkedOut = {this.state.checkedOut}
            closePopup={this.closePopup.bind(this)}
            myCallBack={this.myCallBack}
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
        {/*
        <td className = "AddBox">
        
        <div className = 'Third'>        
          <Fab size="small" color = "primary" className ='Add'>
          <AddIcon/>
          </Fab>
        </div>
        </td>
        */
        }
        
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
      localStorage.setItem("checkedOut" + this.state.id, JSON.stringify(!this.props.checkedOut));
      
      var timestr = findTime();
      var newLog =  this.props.logs + this.state.user + ": " + timestr + "  --  ";

      var itemName = 'log' + this.props.id;
      localStorage.setItem(itemName, JSON.stringify(newLog));
      localStorage.removeItem("user" + this.props.id);
      
      //still need to update database here
      
      localStorage.setItem("green" + this.props.id, false);
        this.setState(
          {
            user: "none"
          }
        );
    }
    else if (this.state.user == '')
    {
      alert("Please enter a user");
      event.preventDefault();
    }
  }

  render() {
    console.log(this)
    return (

        <MiniStudentTable machineID={this.props.id} machineName={this.props.name} machineLogs={this.props.logs} closeFlip={this.props.closePopup} checkIn={true} change={this.props.myCallBack}></MiniStudentTable>

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
    var realCheck = !this.props.checkedOut;
    localStorage.setItem("checkedOut" + this.props.id, JSON.stringify(realCheck));
    var pastLog = this.props.logs;
    var newLog = pastLog + this.state.time + "\n";
    var itemName = 'log' + this.props.id;

    if (this.state.time == '')
    {    
      var timestr = findTime();  
      newLog = pastLog + timestr + "\n";
    }
    localStorage.setItem(itemName, JSON.stringify(newLog));
    
    //still needs to update database 
    localStorage.setItem("green" + this.props.id, true);

  }

  render() {
    return (
      <div className='Login'>
        <div className='PopInner'>
          <div className='Close_bar2'>
            <button className ='closer' onClick={this.props.closePopup}>X</button>
          </div>
          
          <MiniStudentTable machineID={this.props.id} machineName={this.props.name} machineLogs={this.props.logs} closeFlip={this.props.closePopup} change={this.myCallBack}></MiniStudentTable>

        </div>
 
      </div>
    );
  }
}

export default Machine