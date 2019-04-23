import React, { Component } from 'react';
import Machine from './Machine'
import './MachineTable.css'


class MachineTable extends Component {
    render() {
        return (
        <table className="MachineTable">

        <tbody className = "chart">
          <tr className = "Titles">
            <th className = "MName">Name</th>
            <th className = "Keys">Checkout/in</th>
            <th className = "KeyHistory">History</th>

            <th className = "AS">Add Users</th>
          </tr>
          <Machine name="Mill"></Machine>
          <Machine name="Mill"></Machine>
          <Machine name="Lathe"></Machine>
          <Machine name="Lathe"></Machine>
          <Machine name="CNC Mill"></Machine>
          <Machine name="CNC Router"></Machine>
          <Machine name="CNC Plasma"></Machine>

        </tbody>
      </table>
        )
    }
}

export default MachineTable