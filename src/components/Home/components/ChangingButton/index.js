import React, { Component } from 'react';
import "./index.css"
import Button from '@material-ui/core/Button';

class ChangingButton extends Component {
  
  constructor(props){
    super(props);

    let btn_class = this.props.green ? "greenButton" : "redButton";
    
    this.state = 
    {
      green: this.props.green,
      btn_class: btn_class
    };

    this.checkOut = this.checkOut.bind(this);

  }

  checkOut() 
  {
    if (this.state.green) 
      this.props.triggerParentUpdate();
    
  }

  update = () => {
    console.log("REACHED")
    let btn_class = !this.state.green ? "greenButton" : "redButton";
    this.setState({
      green: !this.state.green,
      btn_class: btn_class
    })
  }
 
    render(){

      return (
        <div>
          <button onClick={this.props.change}>hi</button>
          <Button variant ='outlined' className={this.state.btn_class} onClick={this.checkOut.bind(this)}>&nbsp;</Button>
        </div>
      )
    }
  }

  export default ChangingButton