import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit';
import './react-bootstrap-table2.min.css';
import React, {Component} from 'react';
import {ExcelButton} from './excel';
import {compose} from 'recompose';
import {withRouter} from 'react-router-dom';

import {withFirebase} from '../../../Firebase';

//import './bootstrap.css'

const {SearchBar} = Search;

function saveCheck(spot, toCheck) {
    //var spot = row + "-" + column;
    localStorage.setItem("check" + spot, JSON.stringify(!toCheck));
    //alert("reached" + spot);
}

class NStudentTable extends Component {
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
                text: 'Contact'
            }, {
                text: 'Mill',
                formatter: this.cellFormatter1
            }, {
                text: 'Lathe',
                formatter: this.cellFormatter2
            }, {
                text: 'CNC Mill',
                formatter: this.cellFormatter3
            }, {
                text: 'CNC Router',
                formatter: this.cellFormatter4
            }, {
                text: 'CNC Plasma',
                formatter: this.cellFormatter5
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

    addStudent = (FirstName, LastName, Email, num) => {
        this.props.firebase.addUser(FirstName, LastName, Email, num)
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
                    <div className="problem">
                        <div className="options">
                            <SearchBar { ...props.searchProps }/>
                            <button className="hide">&nbsp;</button>
                        </div>

                        <BootstrapTable bootstrap4={true} { ...props.baseProps }/>
                        <button
                            onClick={this
                            .togglePopup
                            .bind(this)}>Add Student</button>
                        {this.state.showPopup
                            ? <AddPrompt
                                    data={this.state.data}
                                    add={this.addStudent}
                                    total={this.state.data.length+1}
                                    closePopup={this
                                    .togglePopup
                                    .bind(this)}/>
                            : null
}
                        <ExcelButton/>
                    </div>
                )
}
            </ToolkitProvider>
        )
    }
}

class AddPrompt extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            newContact: '',
            //id: this.props.id,
        };

        this.handleChangeFirst = this
            .handleChangeFirst
            .bind(this);
        
        this.handleChangeLast = this
            .handleChangeLast
            .bind(this);
        this.handleChangeContact = this
            .handleChangeContact
            .bind(this);

        this.handleSubmit = this
            .handleSubmit
            .bind(this);
    }

    handleChangeFirst(event) {
        this.setState({firstName: event.target.value});
    }

    handleChangeLast(event) {
        this.setState({lastName: event.target.value});
    }

    handleChangeContact(event) {
        this.setState({newContact: event.target.value});
    }

    handleSubmit(event) {
        this.props.add(this.state.firstName, this.state.lastName, this.state.newContact, this.props.total)
    }

    render() {
        return (
            <div className='Login'>
                <div className='Login_inner'>
                    <div className='Close_bar'>
                        <button className='closer' onClick={this.props.closePopup}>X</button>
                    </div>

                    <div className='SignIn'>
                        Add a User
                        <form className='SignForm' onSubmit={this.handleSubmit}>
                            New User's First Name:
                            <label className='UserBar'>

                                <input type="text" value={this.state.newName} onChange={this.handleChangeFirst}/>
                            </label>
                            New User's Last Name:
                            <label className='UserBar'>

                                <input type="text" value={this.state.newName} onChange={this.handleChangeLast}/>
                            </label>
                            Email:
                            <label className='PasswordBar'>

                                <input
                                    type="text"
                                    value={this.state.newContact}
                                    onChange={this.handleChangeContact}/>
                            </label>
                            <input type="submit" value="Submit"/>
                        </form>
                    </div>

                </div>

            </div>
        );
    }
}

const StudentTable = compose(withRouter, withFirebase,)(NStudentTable);

export {StudentTable};
