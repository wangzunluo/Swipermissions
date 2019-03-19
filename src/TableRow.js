import React, { Component } from 'react';
import './TableRow.css'

class TableRow extends Component
{
  render()
  {
    
    if (this.props.available === "Available")
    {
      var cellStyle = "AvailableStyle"
    }
    else
    {
      var cellStyle = "UnavailableStyle"
    }
    return (
      <tr className="TableRow">
        <td>{this.props.name}</td>
        <td className= {cellStyle}>{this.props.available}</td>
        
      </tr>
    )
  }
}

export default TableRow