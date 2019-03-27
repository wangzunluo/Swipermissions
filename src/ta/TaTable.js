import React, { Component } from 'react';
import TableRow from './TaTableRow'
import './TaTable.css'

class TaTable extends Component
{
  render()
  {
    return (
      <table className="MainTable">
        <tr>
          <th>Machine</th>
          <th>Name</th>
          <th>Check-in Time</th>
        </tr>
        <TableRow resource="Machine A" user="Matthew" time="00:00"></TableRow>
        <TableRow resource="Machine B" user="Ramsey" time="00:00"></TableRow>
        <TableRow resource="Machine C" user="Matthew" time="00:00"></TableRow>
        <TableRow resource="Machine D" user="Ramsey" time="00:00"></TableRow>
        <TableRow resource="Machine E" user="Matthew" time="00:00"></TableRow>
        <TableRow resource="Machine F" user="Ramsey" time="00:00"></TableRow>
        <TableRow resource="Machine A" user="Matthew" time="00:00"></TableRow>
        <TableRow resource="Machine B" user="Ramsey" time="00:00"></TableRow>
        <TableRow resource="Machine A" user="Matthew" time="00:00"></TableRow>
        <TableRow resource="Machine B" user="Ramsey" time="00:00"></TableRow>
      </table>
    )
  }
}

export default TaTable