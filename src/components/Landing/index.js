import React from 'react'
import { MTable } from './components/MachineTable';
import { StudentTable } from './components/StudentTable';

import './index.css';

function clearStorage()
{
    localStorage.clear();
}


const LandingPage = () => (
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
            <MTable/>
            </div>

        </div>
    </div>
)

export { LandingPage }

