import StudentRow from "./StudentRow";
import React, { Component } from 'react';
import './StudentTable.css'


class StudentTable extends Component {
    render() {
        return (
        <table className="MainTable">
        <tbody>
          <tr>
            <th className = "HName">Name</th>
            <th className = "HID">ID</th>
          </tr>
          <StudentRow name="Bro" ID="1337"></StudentRow>
          <StudentRow name="Student A" ID="In use"></StudentRow>
          <StudentRow name="Student C" ID="ID"></StudentRow>
          <StudentRow name="Student D" ID="In use"></StudentRow>
          <StudentRow name="Student E" ID="ID"></StudentRow>
          <StudentRow name="Student F" ID="In use"></StudentRow>
          <StudentRow name="Student G" ID="ID"></StudentRow>
          <StudentRow name="Student H" ID="In use"></StudentRow>
          <StudentRow name="Student I" ID="ID"></StudentRow>
          <StudentRow name="Student J" ID="In use"></StudentRow>
        </tbody>
      </table>
        )
    }
}

export default StudentTable