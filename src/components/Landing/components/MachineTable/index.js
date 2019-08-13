import React, {Component} from 'react';
import {MyMachine} from '../Machine'
import './index.css'
import {compose} from 'recompose';
import {withRouter} from 'react-router-dom';

import {withFirebase} from '../../../Firebase';
import {saveAs} from 'file-saver';
import JSZip from "jszip"

class MachineTable extends Component {

    constructor(props) {
        super(props)

        this.state = {
            data: [],
            clearFuncs: []
        }

        this
            .props
            .firebase
            .readMachinesOnce()
            .then((value) => {
                if (value) 
                    this.parseData(value)
            })

    }

    parseData(data) {
        let parsed = []
        let counter = 1
        console.log(data)
        data.forEach((row) => {
            parsed.push({
                name: row.name,
                id: counter,
                user: row.user,
                available: row.available,
                logs: row.logs,
                slogs: row.slogs
            })
            counter++
        })
        this.setState({data: parsed})
    }

    saveLogs = () => {
        this
            .props
            .firebase
            .readMachinesOnce()
            .then((value) => {
                if (value) {
                    var zip = new JSZip();
                    let counter = 0
                    value.forEach((row) => {
                        let text = ''
                        if (row.logs) {
                            row
                                .logs
                                .forEach(log => {
                                    if (log) {
                                        text += log.user + " " + log.type + " " + log.time + "\n"
                                    }
                                })

                            zip.file(row.name + counter + "_logs.txt", text)
                        }
                        if (row.slogs) {
                            zip.file(row.name + counter + "_special_logs.txt", row.slogs)
                        }
                        counter++
                    })

                    let today = new Date()
                    if (Object.keys(zip.files).length) {
                        zip
                            .generateAsync({type: "blob"})
                            .then(function (content) {
                                // see FileSaver.js
                                saveAs(content, "logs_" + (today.getMonth() + 1) + "." + today.getDate() + "." + today.getFullYear() + ".zip");
                            });
                    } else {
                        alert("There are no logs to generate!")
                    }

                }
            })
    }

    clearLogs = () => {
        let machines = []
        this
            .state
            .clearFuncs
            .forEach((func) => {
                machines.push(func())
            })
        console.log(machines)
        machines.forEach((id) => {
            this
                .props
                .firebase
                .clearLogs(id)
        })
    }

    renderMachines() {

        return this
            .state
            .data
            .map((machine, i) => {
                return <MyMachine
                    key={i}
                    name={machine.name}
                    id={machine.id}
                    clear={update => this
                    .state
                    .clearFuncs
                    .push(update)}
                    user={machine.user}
                    available={machine.available}
                    logs={machine.logs}
                    slogs={machine.slogs}/>
            })
    }

    render() {
        return (
            <div>
                <div>
                    <table className="MachineTable">

                        <tbody className="chart">
                            <tr className="Titles">
                                <th className="MName">Name</th>
                                <th className="Keys">Checkout/in</th>
                                <th className="KeyHistory">History</th>

                                <th className="AS">Special Logs</th>
                            </tr>
                            {this.renderMachines()}

                        </tbody>
                    </table>
                    
                </div>
                <div>
                    <button className="SaveLog" onClick={this.saveLogs}>Save Logs</button>
                    <button className="ClearLog" onClick={this.clearLogs}>Clear All Logs</button>
                </div>
            </div>
        )
    }
}

const MTable = compose(withRouter, withFirebase,)(MachineTable);

export {MTable};