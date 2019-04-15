import React, { Component } from 'react';
import './Log.css';

class Log extends Component {
    render()
    {
        return (
        <tr className="Log">
          <td className= "LName">{this.props.name}</td>
          <td className = "AName">{this.props.author}</td>          
        </tr>
      )
    }
}

export default Log