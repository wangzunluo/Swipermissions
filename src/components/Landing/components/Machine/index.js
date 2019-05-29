import React, { Component } from 'react';
import './index.css';
import ChangingButton from "../ChangingButton";
import {MiniStudentTable} from "../MiniStudentTable";
import {compose} from 'recompose';
import {withRouter} from 'react-router-dom';
import {withFirebase} from '../../../Firebase';

import Fab from '@material-ui/core/Fab';

import ErrorIcon from '@material-ui/icons/Error';
import AddCommentIcon from '@material-ui/icons/AddComment';

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
  else if (hour === 0)
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
    var oldlog = "";
    var oldCheck = false;
    var oldUser = "";

    if (!(this.props.logs === undefined))
    {
      oldlog = this.props.logs
    }

    oldCheck = this.props.available === 't' ? false : true

    
    oldUser = this.props.user
    


    this.state = {
      dismiss: false,
      showPopup: false, 
      showCheckOut: false,
      showCheckIn: false,
      showLogs: false,
      closeLogs: false,
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

  xclose = () =>
  {
    this.setState(
      {
        showCheckIn: false,
        showCheckOut: false,
        checkedOut: false
      }
    );
  }

  closePopup(outlog)
  {
    console.log(this.state)
    if(outlog) {
      if (this.state.logs === "") {
        console.log("maybe")
        this.setState({logs: [,outlog]})
      }else{
        console.log("maybe2")
        
        let previous = this.state.logs.slice()
        previous.push(outlog)
        this.setState({logs:previous})
      }
    }
    this.setState(
      {
        showCheckIn: false,
        showCheckOut: false
      }
    );
    console.log(this.state)

  }
  
  togglePopup = (name, outlog) => {
    console.log(this.state)
    console.log("maybe")

    if (!this.state.checkedOut)
    {
      
      
      this.setState({
        showCheckOut: !this.state.showCheckOut
      });
    }
    else {
      console.log("here?")

      let id
      let log
      let user = name
      if (this.state.logs === "") {
         id = 1
         log = {user: user, type: "check-in", time: findTime()}

         this.setState({logs: [,log]})
      }else{

         id = this.state.logs.length

         let previous = this.state.logs.slice()
         log = {user: user, type: "check-in", time: findTime()}
         previous.push(log)
        console.log("here?2")

         this.setState({logs:previous})
      }
      this.props.firebase.checkinMachine(this.props.id, this.props.name, log, id).then(
        //log here as well
        this.childUpdate("\u00a0")  
      )
    }

    this.setState({
      checkedOut: !this.state.checkedOut
    }) 
    console.log(this.state)

   
  }

  handleSubmit = (name, type) =>
  {
    console.log(name)
    var realCheck = !this.props.checkedOut;
    localStorage.setItem("checkedOut" + this.props.id, JSON.stringify(realCheck));
    var pastLog = this.props.logs;
    var newLog = pastLog + this.state.time + "\n";
    var itemName = 'log' + this.props.id;

    
    localStorage.setItem(itemName, JSON.stringify(newLog));
    
    
    //still needs to update database 
    localStorage.setItem("green" + this.props.id, true);

  }

  showLogs() {
    alert(this.state.logs)
  }

  toggleLogs = () => {
    if(!this.state.closeLogs)
      this.setState({showLogs:!this.state.showLogs, closeLogs: true})
  }

  closeLogs = () => {
    this.setState({showLogs:false, closeLogs: false})
  }

  render()
  {
      return (
      <tr className="Machine" key={this.props.key}>
        <td className= "MName">{this.props.name}</td>
        <td className = "KeyBox">
        <ChangingButton handleLogs={this.handleSubmit} change={update => this.childUpdate = update} green = {!this.state.checkedOut} id= {this.props.id} triggerParentUpdate= {this.togglePopup } name={this.state.user}></ChangingButton>
        
        {this.state.showCheckOut ? 
          <Checkin 
            id = {this.state.id}
            name = {this.props.name}
            logs = {this.state.logs}
            checkedOut = {this.state.checkedOut}
            closePopup={this.closePopup.bind(this)}
            xclose={this.xclose}
            myCallBack={this.childUpdate}
          />
          :null
        }
        </td>
        <td className = "InfoBox" onClick={this.toggleLogs}>
        <div className = 'Third'>        
          <Fab size="small" color = "primary" className ='Info' >
          <AddCommentIcon className = 'Icon2' />
          </Fab>
        </div>
        {this.state.showLogs ? 
          <Editor
            logs={this.state.logs}
            closePopup={this.closeLogs}
          />
          :null
        }
        </td>
        <td className = "InfoBox2" onClick={this.toggleLogs}>
          <div className = 'Fourth'>        
            <Fab size="small" color = "primary" className ='Info' >
            <ErrorIcon className = 'Icon3' />
            </Fab>
          </div>
          {/*this.state.showLogs ? 
            <Editor
              logs={this.state.logs}
              closePopup={this.closeLogs}
            />
            :null
          */}
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

  handleSubmit = () =>
  {
    var realCheck = !this.props.checkedOut;
    localStorage.setItem("checkedOut" + this.props.id, JSON.stringify(realCheck));
    var pastLog = this.props.logs;
    var newLog = pastLog + this.state.time + "\n";
    var itemName = 'log' + this.props.id;

   
    localStorage.setItem(itemName, JSON.stringify(newLog));
    console.log(newLog)
    
    //still needs to update database 
    localStorage.setItem("green" + this.props.id, true);

  }

  render() {
    return (
      <div className='Login'>
        <div className='PopInner'>
          <div className='Close_bar2'>
            <button className ='closer' onClick={this.props.xclose}>X</button>
          </div>
          
          <MiniStudentTable machineID={this.props.id} machineName={this.props.name} machineLogs={this.props.logs} closeFlip={this.props.closePopup} change={this.props.myCallBack} ></MiniStudentTable>

        </div>
 
      </div>
    );
  }
}

class Editor extends Machine {
  constructor(props) {
    super(props)
    let text = ''
    if (this.props.logs) {
      this.props.logs.forEach(log => {
        if(log) {
          text += log.user + " " + log.type + " " + log.time +"\n"
        }
      })
    }
    
    this.state = {
      textareaValue: text,
      
    }
  }
  handleOnChange(event) {
    this.setState({
      textareaValue: event.target.value
    })
    event.preventDefault();
  }
  handleOnSubmit(event) {
    event.preventDefault();
    
    this.props.closePopup();

    
  }
  render() 
  {
    return (
    
      <div className = "Login">
        <div className = "PopInner">
          <div className='Close_bar2'>
          {"Logs" }
            <button className ='closer' onClick={this.props.closePopup}>X</button>
          </div>
          <form onSubmit={(event) => this.handleOnSubmit(event)}>
            <textarea rows={10} cols={30} value={this.state.textareaValue} 
              onChange={(event) => this.handleOnChange(event)}></textarea>
            <br/>
          </form>
        </div>
      </div>
    );
  }
}

const MyMachine = compose(withRouter, withFirebase,)(Machine);

export { MyMachine }