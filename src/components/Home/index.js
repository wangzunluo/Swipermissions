import React from 'react'
import MachineTable from './components/MachineTable';
import { StudentTable } from './components/StudentTable';

import './index.css';

function clearStorage()
{
    localStorage.clear();
}


const HomePage = () => (
    <div className = "Wrapper">
        <div className = "Banner">
        Admin View
        <button onClick= {clearStorage}>Clear Storage</button>
        </div>
        <div className = "Top">
            <div className = "StudentTable">
                <StudentTable></StudentTable>
            </div>

            <div className = "MachineTable">
            <MachineTable></MachineTable>
            </div>

        </div>
    </div>
)

export { HomePage }

