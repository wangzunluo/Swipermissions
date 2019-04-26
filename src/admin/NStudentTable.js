import BootstrapTable, {TableHeaderColumn} from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import './react-bootstrap-table2.min.css' ;
import React, { Component } from 'react';
import { Type } from 'react-bootstrap-table2-editor';

//import './bootstrap.css'


const { SearchBar } = Search;
const columns = [{
  //style: "color: white;",
  dataField: 'name',
  text: 'Name',
}, {
  dataField: 'email',
  text: 'Contact'
}, {

  dataField: 'm1',
  text: 'Mill',
  lookup: {1: 'yes', 2: 'no'},
  formatter: cellFormatter1
},
{

    dataField: 'm2',
    text: 'Lathe',
    lookup: {1: 'yes', 2: 'no'},
    formatter: cellFormatter2
},
{

    dataField: 'm3',
    text: 'CNC Mill',
    lookup: {1: 'yes', 2: 'no'},
    formatter: cellFormatter3
},
{

    dataField: 'm4',
    text: 'CNC Router',
    lookup: {1: 'yes', 2: 'no'},
    formatter: cellFormatter4
},
{

    dataField: 'm5',
    text: 'CNC Plasma',
    lookup: {1: 'yes', 2: 'no'},
    formatter: cellFormatter5
}];

function saveCheck(spot, toCheck)
{
    //var spot = row + "-" + column;
    //localStorage.setItem("check" + spot, JSON.stringify(!toCheck));
    alert("reached" + spot);
}

function cellFormatter1(cell,row, rowIndex) {
    //alert(rowIndex + "-" + 1);
    var spot = rowIndex + "-" + 1;
    var toCheck = false;

    if (!(JSON.parse(localStorage.getItem("check" + spot)) == undefined))
    {
        toCheck = JSON.parse(localStorage.getItem("check" + spot));
        alert(toCheck);
    }

    /*
    if (cell == 2) {
        //alert(row)
        //alert(rowIndex);
        return (
            <input
                type="checkbox"
                checked
                />
        );
    }
    */

  return (
    <input type="checkbox" onClick= {saveCheck(spot, toCheck)}/>
  );
}

function cellFormatter2(cell, row, rowIndex) {
  
    if (cell == 2) {
        //alert(row)
        //alert(rowIndex);
        return (
            <input
                type="checkbox"
                checked
                />
        );
    }

  return (
    <input type="checkbox"/>
  );
}

function cellFormatter3(cell, row, rowIndex) {
  
    if (cell == 2) {
        //alert(row)
        //alert(rowIndex);
        return (
            <input
                type="checkbox"
                checked
                />
        );
    }

  return (
    <input type="checkbox"/>
  );
}

function cellFormatter4(cell, row, rowIndex) {
  
    if (cell == 2) {
        //alert(row)
        //alert(rowIndex);
        return (
            <input
                type="checkbox"
                checked
                />
        );
    }

  return (
    <input type="checkbox"/>
  );
}

function cellFormatter5(cell, row, rowIndex) {
  
    if (cell == 2) {
        //alert(row)
        //alert(rowIndex);
        return (
            <input
                type="checkbox"
                checked
                />
        );
    }

  return (
    <input type="checkbox"/>
  );
}

class NStudentTable extends Component{
    constructor(){
        super();
        this.state = 
        {
            data:JSON.parse(localStorage.getItem('data')) ||
            [
                { name: 'Matthew Ramsey', email: "Matthew.M.Ramsey-1@ou.edu", m1: 1, m2: 2, m3: 1, m4: 2, m5: 2 },
                { name: 'Arwin', email: "arwin@ou.edu", m1: 1, m2: 2, m3: 1, m4: 2, m5: 2 },
                { name: 'Jake', email: "baerj@ou.edu", m1: 2, m2: 2, m3: 1, m4: 2, m5: 2 },
                { name: 'Matthew Ramsey', email: "Matthew.M.Ramsey-1@ou.edu", m1: 1, m2: 2, m3: 1, m4: 2, m5: 2 },
                { name: 'Arwin', email: "arwin@ou.edu", m1: 1, m2: 2, m3: 1, m4: 2, m5: 2 },

            ]
        };

        this.addRow = this.addRow.bind(this);
    }

    addRow()
    {
        
        var newArray = this.state.data.slice();   

        newArray.push({ name: 'Jake', email: "baerj@ou.edu", m1: 2, m2: 2, m3: 1, m4: 2, m5: 2 });   
        this.setState({data:newArray});
        localStorage.setItem('data', JSON.stringify(newArray));

    }

    render() {
        return(
            <ToolkitProvider className= "myTable"
                bootstrap4 = {true}
                keyField="Name"
                data= {this.state.data}
                
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
                        <button onClick= {this.addRow.bind(this)}>Add Student</button>
                        <button>Read Excel</button>
                        
                    </div>
                    )
                }
            </ToolkitProvider>
        )
    }
}

export default NStudentTable;

