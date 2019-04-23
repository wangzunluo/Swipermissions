import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import './react-bootstrap-table2.min.css' ;
import React, { Component } from 'react';
import { Type } from 'react-bootstrap-table2-editor';

//import './bootstrap.css'



const { SearchBar } = Search;
const columns = [{
  style: "color: white;",
  dataField: 'name',
  text: 'Name'
}, {
  dataField: 'email',
  text: 'Contact'
}, {

  dataField: 'm1',
  text: 'Mill',
  type: Type.CHECKBOX,
  value: 'Y:N',
  editor:{
    type: Type.CHECKBOX,
    value: 'Y:N'
  }
},
{

    dataField: 'm2',
    text: 'Lathe',
    lookup: {1: 'yes', 2: 'no'}
},
{

    dataField: 'm3',
    text: 'CNC Mill',
    lookup: {1: 'yes', 2: 'no'}
},
{

    dataField: 'm4',
    text: 'CNC Router',
    lookup: {1: 'yes', 2: 'no'}
},
{

    dataField: 'm5',
    text: 'CNC Plasma',
    lookup: {1: 'yes', 2: 'no'}
}];
class NStudentTable extends Component{
    render() {
        return(
            <ToolkitProvider className= "myTable"
                bootstrap4 = {true}
                keyField="id"
                data={
                    [
                        { name: 'Matthew Ramsey', email: "Matthew.M.Ramsey-1@ou.edu", m1: 'Y', m2: 2, m3: 1, m4: 2, m5: 2 },
                        { name: 'Arwin', email: "arwin@ou.edu", m1: 1, m2: 2, m3: 1, m4: 2, m5: 2 },
                        { name: 'Jake', email: "baerj@ou.edu", m1: 2, m2: 2, m3: 1, m4: 2, m5: 2 },
                        { name: 'Batthew', email: "Matthew.M.Ramsey-1@ou.edu", m1: 2, m2: 2, m3: 1, m4: 2, m5: 2 },
                        { name: 'Urwin', email: "arwin@ou.edu", m1: 1, m2: 2, m3: 1, m4: 2, m5: 2 },
                        { name: 'Rake', email: "baerj@ou.edu", m1: 1, m2: 2, m3: 1, m4: 2, m5: 2 },
                        { name: 'Matthew', email: "Matthew.M.Ramsey-1@ou.edu", m1: 1, m2: 2, m3: 1, m4: 2, m5: 2 },
                        { name: 'Arwin', email: "arwin@ou.edu", m1: 1, m2: 2, m3: 1, m4: 2, m5: 2 },
                        { name: 'Jake', email: "baerj@ou.edu", m1: 2, m2: 2, m3: 1, m4: 2, m5: 2 },
                        { name: 'Batthew', email: "Matthew.M.Ramsey-1@ou.edu", m1: 2, m2: 2, m3: 1, m4: 2, m5: 2 },
                        { name: 'Urwin', email: "arwin@ou.edu", m1: 1, m2: 2, m3: 1, m4: 2, m5: 2 },
                        { name: 'Rake', email: "baerj@ou.edu", m1: 1, m2: 2, m3: 1, m4: 2, m5: 2 },
                        { name: 'Arwin', email: "arwin@ou.edu", m1: 1, m2: 2, m3: 1, m4: 2, m5: 2 },
                        { name: 'Jake', email: "baerj@ou.edu", m1: 2, m2: 2, m3: 1, m4: 2, m5: 2 },
                        { name: 'Batthew', email: "Matthew.M.Ramsey-1@ou.edu", m1: 2, m2: 2, m3: 1, m4: 2, m5: 2 },
                        { name: 'Urwin', email: "arwin@ou.edu", m1: 1, m2: 2, m3: 1, m4: 2, m5: 2 },
                        { name: 'Rake', email: "baerj@ou.edu", m1: 1, m2: 2, m3: 1, m4: 2, m5: 2 },
                        { name: 'Arwin', email: "arwin@ou.edu", m1: 1, m2: 2, m3: 1, m4: 2, m5: 2 },
                        { name: 'Jake', email: "baerj@ou.edu", m1: 2, m2: 2, m3: 1, m4: 2, m5: 2 },
                        { name: 'Batthew', email: "Matthew.M.Ramsey-1@ou.edu", m1: 2, m2: 2, m3: 1, m4: 2, m5: 2 },
                        { name: 'Urwin', email: "arwin@ou.edu", m1: 1, m2: 2, m3: 1, m4: 2, m5: 2 },
                        { name: 'Rake', email: "baerj@ou.edu", m1: 1, m2: 2, m3: 1, m4: 2, m5: 2 },
                        { name: 'Arwin', email: "arwin@ou.edu", m1: 1, m2: 2, m3: 1, m4: 2, m5: 2 },
                        { name: 'Jake', email: "baerj@ou.edu", m1: 2, m2: 2, m3: 1, m4: 2, m5: 2 },
                        { name: 'Batthew', email: "Matthew.M.Ramsey-1@ou.edu", m1: 2, m2: 2, m3: 1, m4: 2, m5: 2 },
                        { name: 'Urwin', email: "arwin@ou.edu", m1: 1, m2: 2, m3: 1, m4: 2, m5: 2 },
                        { name: 'Rake', email: "baerj@ou.edu", m1: 1, m2: 2, m3: 1, m4: 2, m5: 2 },
                        { name: 'Matthew', email: "Matthew.M.Ramsey-1@ou.edu", m1: 1, m2: 2, m3: 1, m4: 2, m5: 2 },
                        { name: 'Arwin', email: "arwin@ou.edu", m1: 1, m2: 2, m3: 1, m4: 2, m5: 2 },
                        { name: 'Jake', email: "baerj@ou.edu", m1: 2, m2: 2, m3: 1, m4: 2, m5: 2 },
                        { name: 'Batthew', email: "Matthew.M.Ramsey-1@ou.edu", m1: 2, m2: 2, m3: 1, m4: 2, m5: 2 },
                        { name: 'Urwin', email: "arwin@ou.edu", m1: 1, m2: 2, m3: 1, m4: 2, m5: 2 },
                        { name: 'Rake', email: "baerj@ou.edu", m1: 1, m2: 2, m3: 1, m4: 2, m5: 2 },
                        { name: 'Matthew', email: "Matthew.M.Ramsey-1@ou.edu", m1: 1, m2: 2, m3: 1, m4: 2, m5: 2 },
                        { name: 'Arwin', email: "arwin@ou.edu", m1: 1, m2: 2, m3: 1, m4: 2, m5: 2 },
                        { name: 'Jake', email: "baerj@ou.edu", m1: 2, m2: 2, m3: 1, m4: 2, m5: 2 },
                        { name: 'Batthew', email: "Matthew.M.Ramsey-1@ou.edu", m1: 2, m2: 2, m3: 1, m4: 2, m5: 2 },
                        { name: 'Urwin', email: "arwin@ou.edu", m1: 1, m2: 2, m3: 1, m4: 2, m5: 2 },
                        { name: 'Rake', email: "baerj@ou.edu", m1: 1, m2: 2, m3: 1, m4: 2, m5: 2 },
                        { name: 'Arwin', email: "arwin@ou.edu", m1: 1, m2: 2, m3: 1, m4: 2, m5: 2 },
                        { name: 'Jake', email: "baerj@ou.edu", m1: 2, m2: 2, m3: 1, m4: 2, m5: 2 },
                        { name: 'Batthew', email: "Matthew.M.Ramsey-1@ou.edu", m1: 2, m2: 2, m3: 1, m4: 2, m5: 2 },
                        { name: 'Urwin', email: "arwin@ou.edu", m1: 1, m2: 2, m3: 1, m4: 2, m5: 2 },
                        { name: 'Rake', email: "baerj@ou.edu", m1: 1, m2: 2, m3: 1, m4: 2, m5: 2 },
                        { name: 'Arwin', email: "arwin@ou.edu", m1: 1, m2: 2, m3: 1, m4: 2, m5: 2 },
                        { name: 'Jake', email: "baerj@ou.edu", m1: 2, m2: 2, m3: 1, m4: 2, m5: 2 },
                        { name: 'Batthew', email: "Matthew.M.Ramsey-1@ou.edu", m1: 2, m2: 2, m3: 1, m4: 2, m5: 2 },
                        { name: 'Urwin', email: "arwin@ou.edu", m1: 1, m2: 2, m3: 1, m4: 2, m5: 2 },
                        { name: 'Rake', email: "baerj@ou.edu", m1: 1, m2: 2, m3: 1, m4: 2, m5: 2 },
                        { name: 'Arwin', email: "arwin@ou.edu", m1: 1, m2: 2, m3: 1, m4: 2, m5: 2 },
                        { name: 'Jake', email: "baerj@ou.edu", m1: 2, m2: 2, m3: 1, m4: 2, m5: 2 },
                        { name: 'Batthew', email: "Matthew.M.Ramsey-1@ou.edu", m1: 2, m2: 2, m3: 1, m4: 2, m5: 2 },
                        { name: 'Urwin', email: "arwin@ou.edu", m1: 1, m2: 2, m3: 1, m4: 2, m5: 2 },
                        { name: 'Rake', email: "baerj@ou.edu", m1: 1, m2: 2, m3: 1, m4: 2, m5: 2 },

                    ]
                }
                columns={ columns }
                search
                >
                {
                    props => (
                    <div className = "problem">
                        <div className = "options">
                        <SearchBar { ...props.searchProps } />
                        <button className= "hide">&nbsp;</button>
                        </div>

                        <BootstrapTable 
                         bootstrap4 = {true}

                        { ...props.baseProps }
                        />
                        <button>Add Student</button>
                        <button>Read Excel</button>
                        
                    </div>
                    )
                }
            </ToolkitProvider>
        )
    }
}

export default NStudentTable

