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

function findTime()
{
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var sign = "P.M.";
  var hour = today.getHours();
  var minute = today.getMinutes();

  if (today.getHours() < 12)
  {
    sign = "A.M.";
  }

  if (hour > 12)
  {
    hour = hour - 12;
  }
  else if (hour === 0)
  {
    hour = 12;
  }

  if (minute < 10)
  {
    minute = "0" + minute;
  }

  return date + " " + hour + ":" + minute + " " + sign;
}

class NStudentTable2 extends Component {
    constructor(props) {


        super(props);
        console.log(this.props.machineLogs)
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

        this.state = {
            data: [],
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

        console.log(data)

        if(Array.isArray(data)) {
            for(let i=0; i<data.length; i++){
                if (data[i]) {
                    data[i] = {
                        ...data[i],
                        mill: data[i].mill, 
                        lathe: data[i].lathe, 
                        cncmill: data[i].cncmill,
                        cncrouter: data[i].cncrouter,
                        cncplasma: data[i].cncplasma,
                        id: i
                    }
                    for (var att in data[i]) {
                        if (data[i][att] === undefined) {
                          data[i][att] = false
                        }
                    }
                }
            }
            this.setState({data: data})
        }
        else {
            let parsed = []
            for(let key in data) {
                let x = {
                    ...data[key],
                    id: key
                }
                parsed.push(x)
            }
            this.setState({data: parsed})
            console.log(data)
        }
        
    }

    togglePopup()
    {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }

    handleCheck = (machineID, row, name, logs) => {
      let id
      let log
      let user = row.FirstName + " " + row.LastName
      if (logs === "") {
         id = 1
         log = {user: user, type: "check-out", time: findTime()}
      }else{
          console.log(logs)
         log = logs.slice()
         id = log.length
         log = {user: user, type: "check-out", time: findTime()}
      }

      
       
      console.log(log)
      this.props.firebase.checkoutMachine(machineID, user, name, log, id).then(
          this.dismiss(user, log)
      )
      
      
    }

    dismiss = (name, log) => {
        this.props.closeFlip(log)
        this.props.change(name)
    }

    cellFormatterA = (cell, row, rowIndex) => 
    {
        return (
            <button className= "Adder" onClick={() => this.handleCheck(this.props.machineID, row, this.props.machineName, this.props.machineLogs)}>Checkout</button>
        )
    }

    render() {
        
        
        return (
            <ToolkitProvider
                className="myTable"
                bootstrap4={true}
                keyField="Email"
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