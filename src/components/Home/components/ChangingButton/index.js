import React, { Component } from 'react';
import "./index.css"
import Button from '@material-ui/core/Button';

class ChangingButton extends Component {
  
  constructor(props){
    super(props);
    
    this.state = 
    {
      green: this.props.green,
    };

    this.checkOut = this.checkOut.bind(this);
  }

  checkOut() 
  {
    
    this.props.triggerParentUpdate();

  }
 
    render(){
      let btn_class = this.state.green ? "greenButton" : "redButton";

      return (
        <div>
          <Button variant ='outlined' className={btn_class} onClick={this.checkOut.bind(this)}>&nbsp;</Button>
        </div>
      )
    }
  }

  export default ChangingButton