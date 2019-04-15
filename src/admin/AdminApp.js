import StudentTable from "./StudentTable";
import MachineTable from './MachineTable';
import LogTable from "./LogTable";
import React, { Component } from 'react';
import './AdminApp.css'

class AdminApp extends Component
{
    render() {
        return (
            <div>
                <div className = "Top">
                    <div className = "StudentTable">
                    <StudentTable></StudentTable>
                    </div>

                    <div className = "MachineTable">
                    <MachineTable></MachineTable>
                    
                    </div>
                    <div className = "LogTable">
                    <LogTable></LogTable>               
                    </div> 

                </div>


            </div>
        )
    }
}

export default AdminApp