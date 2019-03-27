import React, { Component } from 'react';
import TableRow from './TableRow'
import './Table.css'

class Table extends Component
{
  render()
  {
    return (
      <table className="MainTable">
        <tbody>
          <tr>
            <th>Machine</th>
            <th>Availability</th>
          </tr>
          <TableRow name="Machine A" available="Available"></TableRow>
          <TableRow name="Machine B" available="In use"></TableRow>
          <TableRow name="Machine C" available="Available"></TableRow>
          <TableRow name="Machine D" available="In use"></TableRow>
          <TableRow name="Machine E" available="Available"></TableRow>
          <TableRow name="Machine F" available="In use"></TableRow>
          <TableRow name="Machine G" available="Available"></TableRow>
          <TableRow name="Machine H" available="In use"></TableRow>
          <TableRow name="Machine I" available="Available"></TableRow>
          <TableRow name="Machine J" available="In use"></TableRow>
        </tbody>
      </table>
    )
  }
}

export default Table