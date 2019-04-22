import React, { Component } from 'react';
import Log from './Log'
import './LogTable.css'


class LogTable extends Component {
    render() {
        return (
        <table className="LogTable">

        <tbody className = "chart">
          <tr>
            <th className = "LogH">Logs</th>
            <th className = "Author">Author</th>
          </tr>
          <Log name="April_12_2019.txt" author= "Arwin"></Log>
          <Log name="Log A" author= "Arwin"></Log>
          <Log name="Log C" author= "Arwin"></Log>
          <Log name="Log D" author= "Arwin"></Log>
          <Log name="Log E" author= "Arwin"></Log>
          <Log name="Log F" author= "Arwin"></Log>
        </tbody>
      </table>
        )
    }
}

export default LogTable