import StudentTable from "./StudentTable";
import MachineTable from './MachineTable';
import React, { Component } from 'react';
import './AdminApp.css'

class AdminApp extends Component
{
    render() {
        return (
            <div className = "Top">
                <div className = "StudentTable">
                <StudentTable></StudentTable>
                </div>

                <div className = "MachineTable">
                <MachineTable></MachineTable>
                </div>
            </div> 
        )
    }
}

export default AdminApp