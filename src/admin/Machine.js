import React, { Component } from 'react';
import './Machine.css';

class Machine extends Component {
    render()
    {
        return (
        <tr className="Machine">
          <td className= "MName">{this.props.name}</td>
          <td><button className= "Key">&nbsp;</button></td>
          <td><button className= "Add">+</button></td>
          
        </tr>
      )
    }
}

export default Machine