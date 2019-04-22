import StudentTable from "./StudentTable";
import MachineTable from './MachineTable';
import LogTable from "./LogTable";
import React, { Component } from 'react';
import './AdminApp.css';
import MaterialTable from "material-table";
import SearchIcon from "material-icons";
import NStudentTable from "./NStudentTable";


class AdminApp extends Component
{
    render() {
        return (
            <div>
                <div className = "Banner">
                Admin View
                </div>
                <div className = "Top">
                    <div className = "StudentTable">
                        <NStudentTable></NStudentTable>
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