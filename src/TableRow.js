import React, { Component } from 'react';
import './TableRow.css'

class TableRow extends Component
{
  render()
  {
    return (
      <tr className="TableRow">
        <td>{this.props.name}</td>
        <td>{this.props.available}</td>
      </tr>
    )
  }
}

export default TableRow