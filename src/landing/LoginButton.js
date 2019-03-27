import React, { Component } from 'react';
import './LoginButton.css'

class LoginButton extends Component
{
  render()
  {
    return (
      <button>
        {this.props.text}
      </button>
    )
  }
}

export default LoginButton