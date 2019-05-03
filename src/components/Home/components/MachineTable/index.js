import React, { Component } from 'react';
import Machine from '../Machine'
import './index.css'


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
          <Machine name="Mill" id= "1"></Machine>
          <Machine name="Mill" id= "2"></Machine>
          <Machine name="Lathe" id = "3"></Machine>
          <Machine name="Lathe"  id = "4"></Machine>
          <Machine name="CNC Mill" id = "5"></Machine>
          <Machine name="CNC Router"  id = "6"></Machine>
          <Machine name="CNC Plasma"  id = "7"></Machine>

        </tbody>
      </table>
        )
    }
}

export default MachineTable