import StudentRow from "./StudentRow";
import React, { Component } from 'react';
import './StudentTable.css';
import MaterialTable from "material-table";
import SearchIcon from "material-icons";


class StudentTable extends Component {
    render() {
        return (
            <div>
              <MaterialTable className = "MatTable"
                        columns={[
                            { title: 'Name', field: 'name' },
                            { title: 'Contact', field: 'email' },
                            {
                                title: 'Machine 1',
                                field: 'm1',
                                lookup: { 1: 'Yes', 2: 'No'},
                                style:"width: 20px;"
                            },
                            {
                                title: 'Machine 2',
                                field: 'm2',
                                lookup: { 1: 'Yes', 2: 'No'},
                            },
                            {
                                title: 'Machine 3',
                                field: 'm3',
                                lookup: { 1: 'Yes', 2: 'No'},
                            },
                            {
                                title: 'Machine 4',
                                field: 'm5',
                                lookup: { 1: 'Yes', 2: 'No'},
                            },
                            {
                                title: 'Machine 5',
                                field: 'm6',
                                lookup: { 1: 'Yes', 2: 'No'},
                            },
                        ]}
                        data={[
                            { name: 'Matthew', email: "Matthew.M.Ramsey-1@ou.edu", m1: 1, m2: 2, m3: 1, m4: 2, m5: 2 },
                            { name: 'Arwin', email: "arwin@ou.edu", m1: 1, m2: 2, m3: 1, m4: 2, m5: 2 },
                            { name: 'Jake', email: "baerj@ou.edu", m1: 2, m2: 2, m3: 1, m4: 2, m5: 2 },
                            { name: 'Batthew', email: "Matthew.M.Ramsey-1@ou.edu", m1: 2, m2: 2, m3: 1, m4: 2, m5: 2 },
                            { name: 'Urwin', email: "arwin@ou.edu", m1: 1, m2: 2, m3: 1, m4: 2, m5: 2 },
                            { name: 'Rake', email: "baerj@ou.edu", m1: 1, m2: 2, m3: 1, m4: 2, m5: 2 },

                        ]}
                        title="Students"
                        actions={[
  
                            {
                                icon: 'remove_circle_outline',
                                tooltip: 'Delete user',
                                onClick: (event, rowData) => {

                                    alert('You clicked user ' + rowData.name)
                                },
                                iconProps: {
                                    style: {
                                        fontSize: 25,
                                        color: 'red',
                                    },
                                },
                            },
                        ]}
                        options={{
                            actionsColumnIndex: 0,
                        }}
                        /*
                        editable={{
                        onRowAdd: newData =>
                            new Promise((resolve, reject) => {
                            setTimeout(() => {
                                {
                                /* const data = this.state.data;
                            data.push(newData);
                            this.setState({ data }, () => resolve()); 
                                }
                                resolve()
                            }, 1000)
                            }),
                            /*
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve, reject) => {
                            setTimeout(() => {
                                {
                                /* const data = this.state.data;
                        const index = data.indexOf(oldData);
                        data[index] = newData;                
                        this.setState({ data }, () => resolve()); 
                                }
                                resolve()
                            }, 1000)
                            }),
                        onRowDelete: oldData =>
                            new Promise((resolve, reject) => {
                            setTimeout(() => {
                                {
                                    //let data = this.state.data;
                                    //const index = data.indexOf(oldData);
                                    //data.splice(index, 1);
                                    //this.setState({ data }, () => resolve());
                                }
                                resolve()
                            }, 1000)
                            }),
                        }}
                        */
                        />
            </div>
        )
    }
}

export default StudentTable