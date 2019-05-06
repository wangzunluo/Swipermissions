import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit';
//import './react-bootstrap-table2.min.css';
import React, {Component} from 'react';
import {compose} from 'recompose';
import {withRouter} from 'react-router-dom';
import './index.css';

import {withFirebase} from '../../../Firebase';

//import './bootstrap.css'

const {SearchBar} = Search;

function saveCheck(spot, toCheck) {
    //var spot = row + "-" + column;
    localStorage.setItem("check" + spot, JSON.stringify(!toCheck));
    //alert("reached" + spot);
}

class NStudentTable2 extends Component {
    constructor(props) {
        super(props);

        this.columns = [
            {
                dataField: 'FirstName',
                text: 'First Name'
            }, {
                dataField: 'LastName',
                text: 'Last Name'
            }, {
                dataField: 'Email',
                text: '',
                formatter: this.cellFormatterA
            }
        ];

        //localStorage.clear();
        var oldData = [];

        if (!(JSON.parse(localStorage.getItem('data')) == undefined)) {
            console.log(oldData)
            oldData = JSON.parse(localStorage.getItem('data'));
        }

        this.state = {
            data: oldData,
            showPopup: false
        };

        this.togglePopup = this
            .togglePopup
            .bind(this);

        this
            .props
            .firebase
            .readStudentsOnce()
            .then((value) => {
                if (value) 
                    this.parseData(value)
            })
    }

    parseData = (data) => {
        let parsed = []

        data.forEach((row) => {
            let x = {
              ...row, 
              mill: row.mill, 
              lathe: row.lathe, 
              cncmill: row.cncmill,
              cncrouter: row.cncrouter,
              cncplasma: row.cncplasma
            }
            for (var att in x) {
              if (x[att] === undefined) {
                x[att] = false
              }
            }
            parsed.push(x)
        })

        this.setState({data: parsed})
    }

    togglePopup()
    {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }

    handleCheck = (row, machine) => {
      let fbID = this.state.data.indexOf(row)+1
      let updatedUser = { ...row }
      
 
      updatedUser[machine] = !updatedUser[machine]
      console.log(fbID)
      console.log(updatedUser)
      let newData = this.state.data.slice()
      newData[fbID-1] = updatedUser
      this.setState({data: newData})
      this.props.firebase.updateUser(updatedUser, fbID)
    }

    cellFormatterA = (cell, row, rowIndex) => 
    {
        return (
            <button className= "Adder">Checkout</button>
        )
    }

    cellFormatter1 = (cell, row, rowIndex) => {
      let trueRow = this.state.data.indexOf(row)
      return (<input type="checkbox" checked={this.state.data[trueRow].mill} onClick={() => this.handleCheck(row, "mill")}/>);
    }

    cellFormatter2 = (cell, row, rowIndex) => {
      let trueRow = this.state.data.indexOf(row)
      return (<input type="checkbox" checked={this.state.data[trueRow].lathe} onClick={() => this.handleCheck(row, "lathe")}/>);
    }

    cellFormatter3 = (cell, row, rowIndex) => {
      let trueRow = this.state.data.indexOf(row)
      return (<input type="checkbox" checked={this.state.data[trueRow].cncmill} onClick={() => this.handleCheck(row, "cncmill")}/>);
    }

    cellFormatter4 = (cell, row, rowIndex) => {
      let trueRow = this.state.data.indexOf(row)
      return (<input type="checkbox" checked={this.state.data[trueRow].cncrouter} onClick={() => this.handleCheck(row, "cncrouter")}/>);
    }

    cellFormatter5 = (cell, row, rowIndex) => {
      let trueRow = this.state.data.indexOf(row)
      return (<input type="checkbox" checked={this.state.data[trueRow].cncplasma} onClick={() => this.handleCheck(row, "cncplasma")}/>);
    }

    render() {
        return (
            <ToolkitProvider
                className="myTable"
                bootstrap4={true}
                keyField="Name"
                data={this.state.data}
                columns={this.columns}
                search>
                {props => (
                    <div className="problem2">
                        <div className="options">
                            <SearchBar { ...props.searchProps }/>
                            <button className="hide">&nbsp;</button>
                        </div>

                        <BootstrapTable bootstrap4={true} { ...props.baseProps }/>
                        
                    </div>
                )
}
            </ToolkitProvider>
        )
    }
}



const MiniStudentTable = compose(withRouter, withFirebase,)(NStudentTable2);

export {MiniStudentTable};