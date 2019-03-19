import React, { Component } from 'react';
import './TaTableRow.css'

class TableRow extends Component
{
  render()
  {
    return (
      <tr className="TaTableRow">
        <td>{this.props.resource}</td>
        <td>{this.props.user}</td>
        <td>{this.props.time}</td>
      </tr>
    )
  }
}

export default TableRow