import React, { Component } from 'react';
import './StudentRow.css'

class StudentRow extends Component {
    render()
    {
        return (
        <tr className="TableRow" onClick={this.handleClick}>
          <td className= "SName">{this.props.name}</td>
          <td className= "ID">{this.props.ID}</td>
          
        </tr>
      )
    }
}

export default StudentRow