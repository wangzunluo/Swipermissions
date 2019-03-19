import React, { Component } from 'react';
import TableRow from './TableRow'
import './Table.css'

class Table extends Component
{
  render()
  {
    return (
      <table className="MainTable">
        <tr>
          <th>Machine</th>
          <th>Availability</th>
        </tr>
        <TableRow name="Machine A" available="Available"></TableRow>
        <TableRow name="Machine B" available="In use"></TableRow>
      </table>
    )
  }
}

export default Table