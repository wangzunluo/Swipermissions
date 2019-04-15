import React, { Component } from 'react';
import Machine from './Machine'
import './MachineTable.css'


class MachineTable extends Component {
    render() {
        return (
        <table className="MachineTable">

        <tbody className = "chart">
          <tr>
            <th className = "MName">Name</th>
            <th className = "Keys">Key History</th>
            <th className = "AS">Add Students</th>
          </tr>
          <Machine name="Bro"></Machine>
          <Machine name="Machine A"></Machine>
          <Machine name="Machine C"></Machine>
          <Machine name="Machine D"></Machine>
          <Machine name="Machine E"></Machine>
          <Machine name="Machine F"></Machine>
        </tbody>
      </table>
        )
    }
}

export default MachineTable