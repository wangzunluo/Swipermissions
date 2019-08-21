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
                dataField: 'Mill',
                text: ' Mill ',
                formatter: this.cellFormatter1
            }, {
                dataField: 'Lathe',
                text: ' Lathe ',
                formatter: this.cellFormatter2
            }, {
                dataField: 'CNCMill',
                text: 'CNC\n Mill ',
                formatter: this.cellFormatter3
            }, {
                dataField: 'CNCRouter',
                text: 'CNC\n Router ',
                formatter: this.cellFormatter4
            }, {
                dataField: 'CNCPlasma',
                text: 'CNC\n Plasma ',
                formatter: this.cellFormatter5
            }, {
                dataField: 'Delete',
                text: 'Remove',
                formatter: this.cellFormatter6
            }
        ];

        //localStorage.clear();
        var oldData = [];

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

        console.log(data)

        if (Array.isArray(data)) {
            for (let i = 0; i < data.length; i++) {
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
        } else {
            let parsed = []
            for (let key in data) {
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

    handleCheck = (row, machine) => {
        let fbID = this
            .state
            .data
            .indexOf(row)
        let updatedUser = {
            ...row
        }

        updatedUser[machine] = !updatedUser[machine]
        console.log(fbID)
        console.log(updatedUser)
        let newData = this
            .state
            .data
            .slice()
        newData[fbID] = updatedUser
        this
            .props
            .firebase
            .updateUser(updatedUser, row.id)
            .then(this.setState({data: newData}))
    }

    cellFormatter1 = (cell, row, rowIndex) => {
        let trueRow = this
            .state
            .data
            .indexOf(row)
        return (<input
            type="checkbox"
            checked={this.state.data[trueRow].mill}
            onChange={() => this.handleCheck(row, "mill")}/>);
    }

    cellFormatter2 = (cell, row, rowIndex) => {
        let trueRow = this
            .state
            .data
            .indexOf(row)
        return (<input
            type="checkbox"
            checked={this.state.data[trueRow].lathe}
            onChange={() => this.handleCheck(row, "lathe")}/>);
    }

    cellFormatter3 = (cell, row, rowIndex) => {
        let trueRow = this
            .state
            .data
            .indexOf(row)
        return (<input
            type="checkbox"
            checked={this.state.data[trueRow].cncmill}
            onChange={() => this.handleCheck(row, "cncmill")}/>);
    }

    cellFormatter4 = (cell, row, rowIndex) => {
        let trueRow = this
            .state
            .data
            .indexOf(row)
        return (<input
            type="checkbox"
            checked={this.state.data[trueRow].cncrouter}
            onChange={() => this.handleCheck(row, "cncrouter")}/>);
    }

    cellFormatter5 = (cell, row, rowIndex) => {
        let trueRow = this
            .state
            .data
            .indexOf(row)
        return (<input
            type="checkbox"
            checked={this.state.data[trueRow].cncplasma}
            onChange={() => this.handleCheck(row, "cncplasma")}/>);
    }

    cellFormatter6 = (cell, row, rowIndex) => {
        return (
            <button className="Deleter" onClick={() => this.deleteStudent(row)}>Delete</button>
        );
    }

    deleteStudent = (row) => {
        console.log(this.state.data)
        let fbID = this
            .state
            .data
            .indexOf(row)
        console.log(fbID)
        let newData = this
            .state
            .data
            .slice()
        newData.splice(fbID, 1)
        this
            .props
            .firebase
            .removeUser(row.id)
            .then(this.setState({data: newData}))
    }

    addStudent = (FirstName, LastName, Email, num) => {
        this
            .props
            .firebase
            .addUser(FirstName, LastName, Email, num)
            .then(this.addToTable(FirstName, LastName, Email, num))
    }

    addToTable = (first, last, email, id) => {
        let newData = this.state.data.slice()
        console.log(newData)
        newData[id] = {
            FirstName: first,
            LastName: last,
            Email: email,
            id: id
        }
        this.setState({data: newData})

        console.log(this.state.data)

        this.togglePopup()
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
                                    closePopup={this
                                    .togglePopup
                                    .bind(this)}/>
                            : null
}
                        <ExcelButton updateTable={this.parseData}/>
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
            id: '',
            newContact: '',
            //id: this.props.id,
        };

        this.handleChangeFirst = this
            .handleChangeFirst
            .bind(this);

        this.handleChangeLast = this
            .handleChangeLast
            .bind(this);
        this.handleChangeID = this
            .handleChangeID
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

    handleChangeID(event) {
        this.setState({id: event.target.value});
    }

    handleChangeContact(event) {
        this.setState({newContact: event.target.value});
    }

    handleSubmit() {
        if (this.state.firstName === "") {
            this.props.closePopup()
            return
        }

        if (this.state.lastName === "") {
            this.props.closePopup()
            return
        }

        if (this.state.newContact === "") {
            this.props.closePopup()
            return
        }

        if (this.state.id === "") {
            this.props.closePopup()
            return
        }
        this
            .props
            .add(this.state.firstName, this.state.lastName, this.state.newContact, this.state.id)
    }

    render() {
        return (
            <div className='Login'>
                <div className='Add_inner'>
                    <div className='Close_bar'>
                        <button className='closer' onClick={this.props.closePopup}>X</button>
                    </div>

                    <div className='AddUser'>
                        Add a User <br></br>
                            New User's First Name:
                            <label className='UserBar'>

                                <input
                                    type="text"
                                    value={this.state.firstName}
                                    onChange={this.handleChangeFirst}/>
                            </label>
                            New User's Last Name:
                            <label className='UserBar'>

                                <input
                                    type="text"
                                    value={this.state.lastName}
                                    onChange={this.handleChangeLast}/>
                            </label>
                            New User's Student ID:
                            <label className='UserBar'>

                                <input type="text" value={this.state.id} onChange={this.handleChangeID}/>
                            </label>
                            New User's Email:
                            <label className='PasswordBar'>

                                <input
                                    type="text"
                                    value={this.state.newContact}
                                    onChange={this.handleChangeContact}/>
                            </label>
                            <button onClick={ this.handleSubmit} >Submit</button>
                    </div>

                </div>

            </div>
        );
    }
}

const StudentTable = compose(withRouter, withFirebase,)(NStudentTable);

export {StudentTable};
