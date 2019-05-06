import React, { Component } from 'react';
import Machine from '../Machine'
import './index.css'
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';

import { withFirebase } from '../../../Firebase';

class MachineTable extends Component {

    constructor(props) {
      super(props)

      this.state = {
        data: []
      }

      this.props.firebase.readMachinesOnce().then((value) => {
        if (value) this.parseData(value)
      })

      
    }

    parseData(data) {
      let parsed = []
      let counter = 1
      data.forEach((row) => {
        parsed.push({name: row.name, id: counter, available: row.available, logs: row.logs})
        counter++
      })
      this.setState({data: parsed})
    }

    renderMachines() {
      return this.state.data.map((machine) => {
        return <Machine name={machine.name} id={machine.id} available={machine.available} logs={machine.logs}/>
      })
    }

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
          {this.renderMachines()}

        </tbody>
      </table>
        )
    }
}


const MTable = compose(
  withRouter,
  withFirebase,
)(MachineTable);

export { MTable };