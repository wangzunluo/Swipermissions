import MachineTable from './MachineTable';
import React, { Component } from 'react';
import './AdminApp.css';
import NStudentTable from "./NStudentTable";


class AdminApp extends Component
{
    render() {
        return (
            <div className = "Wrapper">
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

                </div>
            </div>

            
        )
    }
}

export default AdminApp