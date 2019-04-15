import React, { Component } from 'react';
import './Machine.css';
import Button from '@material-ui/core/Button';


class Machine extends Component {
    render()
    {
        return (
        <tr className="Machine">
          <td className= "MName">{this.props.name}</td>
          <td className = "KeyBox"><button className= "Key">&nbsp;</button></td>
          <td><Button variant= 'raised' className= "Add">+</Button></td>
          
        </tr>
      )
    }
}

export default Machine