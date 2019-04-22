import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import './react-bootstrap-table2.min.css' ;
import React, { Component } from 'react';
//import './bootstrap.css'



const { SearchBar } = Search;
const columns = [{
  dataField: 'name',
  text: 'Name'
}, {
  dataField: 'email',
  text: 'Contact'
}, {

  dataField: 'm1',
  text: 'Machine1',
  lookup: {1: 'yes', 2: 'no'}
}];
class NStudentTable extends Component{
    render() {
        return(
            <ToolkitProvider 
                bootstrap4 = {true}
                keyField="id"
                data={
                    [
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
                    <div>
                        <SearchBar { ...props.searchProps } />
                        <hr />
                        <BootstrapTable 
                         bootstrap4 = {true}

                        { ...props.baseProps }
                        />
                    </div>
                    )
                }
            </ToolkitProvider>
        )
    }
}

export default NStudentTable

