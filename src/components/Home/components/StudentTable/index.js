import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import './react-bootstrap-table2.min.css' ;
import React, { Component } from 'react';
import { ExcelButton } from './excel';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';

import { withFirebase } from '../../../Firebase';

//import './bootstrap.css'


const { SearchBar } = Search;
const columns = [{
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
    constructor(props){
        super(props);

        //localStorage.clear();
        var oldData = [];

        if (!(JSON.parse(localStorage.getItem('data')) == undefined))
        {
            console.log(oldData)
            oldData = JSON.parse(localStorage.getItem('data'));
        }

        this.state = 
        {
            data: oldData,
            showPopup: false,
        };

        this.togglePopup = this.togglePopup.bind(this);

        this.props.firebase.readStudentsOnce().then((value) => {
          if (value) this.parseData(value)
        })
    }

    parseData = (data) => {
      let parsed = []

      data.forEach((row) => {
        parsed.push({name: row.FirstName, email: row.Email})
      })
      this.setState({data: parsed})
    }

    togglePopup()
    {
        this.setState(
            {
                showPopup: !this.state.showPopup
            }
        );
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
                        <button onClick= {this.togglePopup.bind(this)}>Add Student</button>
                        {this.state.showPopup ? 
                            <AddPrompt 
                                data = {this.state.data}
                                closePopup={this.togglePopup.bind(this)}
                            />
                            : null
                        }
                        <ExcelButton />
                    </div>
                    )
                }
            </ToolkitProvider>
        )
    }
}

class AddPrompt extends NStudentTable {
    constructor(props) {
      super(props);
      this.state = 
      {
        data: this.props.data,
        newName: '',
        newContact: '',
        //id: this.props.id,
      };
  
      this.handleChangeUser = this.handleChangeUser.bind(this);
      this.handleChangeContact = this.handleChangeContact.bind(this);

  
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChangeUser(event) {
      this.setState({newName: event.target.value});
    }

    handleChangeContact(event) {
        this.setState({newContact: event.target.value});
    }
  
    handleSubmit(event) {
      if (this.state.newName !== '')
      {
        var newArray = this.state.data.slice();   
        newArray.push({ name: this.state.newName, email: this.state.newContact,});   
        this.setState({data:newArray});
        localStorage.setItem('data', JSON.stringify(newArray));
        
      }
      else if (this.state.newName == '')
      {
        alert("Please enter a user");
        event.preventDefault();
      }
    }
  
    render() {
      return (
        <div className='Login'>
          <div className='Login_inner'>
            <div className='Close_bar'>
              <button className ='closer' onClick={this.props.closePopup}>X</button>
            </div>
            
            <div className ='SignIn'>
            Add a User
              <form className='SignForm' onSubmit={this.handleSubmit}>
                New User's Name:
                <label className='UserBar'>
                  
                  <input type="text" value={this.state.newName} onChange={this.handleChangeUser} />
                </label>
                Contact Info:
                <label className='PasswordBar'>
                    
                    <input type="text" value={this.state.newContact} onChange={this.handleChangeContact} />
                </label>
                <input type="submit" value="Submit" />
              </form>
            </div>
  
          </div>
   
        </div>
      );
    }
  }


const StudentTable = compose(
    withRouter,
    withFirebase,
  )(NStudentTable);

export { StudentTable };

