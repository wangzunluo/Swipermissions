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
        if (this.props.checkIn) {
            this.props.firebase.checkinMachine(this.props.machineID, this.props.machineName, this.props.machineLogs).then(
                this.dismiss()
                
            )
        }
        console.log(this.props.machineName)
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
        //query here change
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

    handleCheck = (machineID, row, name, logs) => {
    
      if (logs === undefined) logs = "tbd"

      let user = row.FirstName + " " + row.LastName
      this.props.firebase.checkoutMachine(machineID, user, name, logs).then(
          this.dismiss()
      )
      
      
    }

    dismiss = () => {
        this.props.closeFlip()
        this.props.change()
    }

    cellFormatterA = (cell, row, rowIndex) => 
    {
        return (
            <button className= "Adder" onClick={() => this.handleCheck(this.props.machineID, row, this.props.machineName, this.props.machineLogs)}>Checkout</button>
        )
    }

    render() {
        if (this.props.checkIn) {
            this.props.firebase.checkinMachine(this.props.machineID, this.props.machineName, this.props.machineLogs).then(
                this.dismiss()   
            )
            
            return null
        }
        
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
                        <form/>
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