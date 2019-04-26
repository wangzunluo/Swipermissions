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
  text: 'Mill',
  formatter: cellFormatter1
},
{
    text: 'Lathe',
    formatter: cellFormatter2
},
{
    text: 'CNC Mill',
    formatter: cellFormatter3
},
{
    text: 'CNC Router',
    formatter: cellFormatter4
},
{
    text: 'CNC Plasma',
    formatter: cellFormatter5
}];

function saveCheck(spot, toCheck)
{
    //var spot = row + "-" + column;
    localStorage.setItem("check" + spot, JSON.stringify(!toCheck));
    //alert("reached" + spot);
}

function cellFormatter1(cell,row, rowIndex) {
    //alert(rowIndex + "-" + 1);
    var spot = rowIndex + "-" + 1;
    var toCheck = false;

    if (!(JSON.parse(localStorage.getItem("check" + spot)) == undefined))
    {
        toCheck = JSON.parse(localStorage.getItem("check" + spot));
        //alert(toCheck);
    }

    if (toCheck)
    {
        return (
            <input
                type="checkbox"
                checked
                />
        );
    }
    

  return (
    <input type="checkbox" onClick= {() => saveCheck(spot, toCheck)}/>
  );
}

function cellFormatter2(cell, row, rowIndex) {
  
    var spot = rowIndex + "-" + 2;
    var toCheck = false;

    if (!(JSON.parse(localStorage.getItem("check" + spot)) == undefined))
    {
        toCheck = JSON.parse(localStorage.getItem("check" + spot));
        //alert(toCheck);
    }

    if (toCheck)
    {
        return (
            <input
                type="checkbox"
                checked
                />
        );
    }
    

  return (
    <input type="checkbox" onClick= {() => saveCheck(spot, toCheck)}/>
  );
}

function cellFormatter3(cell, row, rowIndex) {
  
    var spot = rowIndex + "-" + 3;
    var toCheck = false;

    if (!(JSON.parse(localStorage.getItem("check" + spot)) == undefined))
    {
        toCheck = JSON.parse(localStorage.getItem("check" + spot));
        //alert(toCheck);
    }

    if (toCheck)
    {
        return (
            <input
                type="checkbox"
                checked
                />
        );
    }
    

  return (
    <input type="checkbox" onClick= {() => saveCheck(spot, toCheck)}/>
  );
}

function cellFormatter4(cell, row, rowIndex) {
  
    var spot = rowIndex + "-" + 4;
    var toCheck = false;

    if (!(JSON.parse(localStorage.getItem("check" + spot)) == undefined))
    {
        toCheck = JSON.parse(localStorage.getItem("check" + spot));
        //alert(toCheck);
    }

    if (toCheck)
    {
        return (
            <input
                type="checkbox"
                checked
                />
        );
    }
    

  return (
    <input type="checkbox" onClick= {() => saveCheck(spot, toCheck)}/>
  );
}

function cellFormatter5(cell, row, rowIndex) {
  
    var spot = rowIndex + "-" + 5;
    var toCheck = false;

    if (!(JSON.parse(localStorage.getItem("check" + spot)) == undefined))
    {
        toCheck = JSON.parse(localStorage.getItem("check" + spot));
        //alert(toCheck);
    }

    if (toCheck)
    {
        return (
            <input
                type="checkbox"
                checked
                />
        );
    }
    

  return (
    <input type="checkbox" onClick= {() => saveCheck(spot, toCheck)}/>
  );
}

class NStudentTable extends Component{
    constructor(){
        super();
        this.state = 
        {
            data:JSON.parse(localStorage.getItem('data')) ||
            [
                { name: 'Matthew Ramsey', email: "Matthew.M.Ramsey-1@ou.edu",},
                { name: 'Arwin', email: "arwin@ou.edu",},
                { name: 'Jake', email: "baerj@ou.edu",},
                { name: 'Matthew Ramsey', email: "Matthew.M.Ramsey-1@ou.edu",},
                { name: 'Arwin', email: "arwin@ou.edu",},

            ]
        };

        this.addRow = this.addRow.bind(this);
    }

    addRow()
    {
        
        var newArray = this.state.data.slice();   

        newArray.push({ name: 'Jake', email: "baerj@ou.edu",});   
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

