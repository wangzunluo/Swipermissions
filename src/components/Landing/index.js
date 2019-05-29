import React from 'react'
import { MTable } from './components/MachineTable';
import { StudentTable } from './components/StudentTable';

import './index.css';

const LandingPage = () => (
    <div className = "Wrapper">
        <div className = "Banner">
        Admin View
        </div>
        <div className = "Top">


            <div className = "StudentTable">
                <MTable/>
            </div>
            <div className = "MachineTable">
                <StudentTable></StudentTable>
            </div>

        </div>
    </div>
)

export { LandingPage }

