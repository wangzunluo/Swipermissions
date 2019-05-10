import React, { Component } from 'react';
import "./index.css"
import Button from '@material-ui/core/Button';

class ChangingButton extends Component {
  
  constructor(props){
    super(props);

    let btn_class = this.props.green ? "greenButton" : "redButton";
    
    let myuser = this.props.name==="none" ? '\u00a0': this.props.name
    this.state = 
    {
      green: this.props.green,
      btn_class: btn_class,
      user: myuser
    };

    this.checkOut = this.checkOut.bind(this);

  }

  componentDidMount = () => {
    this.props.change(this.update)
  }

  checkOut() 
  {
    this.props.triggerParentUpdate(this.state.user);
    
  }

  update = (name) => {
    let myuser = this.state.user==="\u00a0" ? name :this.state.user
    let btn_class 
    let type
    if (!this.state.green) {
      btn_class= "greenButton"
      type="check-in"
    }else{
      btn_class="redButton"
      type="check-out"
    }
      
    this.setState({
      green: !this.state.green,
      btn_class: btn_class,
      user: name
    })
    this.props.handleLogs(myuser,type)
  }

 
    render(){

      return (
        <div>
          <Button variant ='outlined' className={this.state.btn_class} onClick={this.checkOut}>{this.state.user}</Button>
        </div>
      )
    }
  }

  export default ChangingButton