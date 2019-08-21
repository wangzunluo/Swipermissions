import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import XLSX from 'xlsx'
import "./excel.css"

import { withFirebase } from '../../../Firebase';

class ReadExcel extends Component {
  constructor(props) {
      super(props)
      this.ex = React.createRef()
  }

  componentDidMount() {
    this.ex.current.addEventListener("change", this.handleExcelFile, false);
  }

  componentWillUnmount() {
    this.ex.current.removeEventListener("change", this.handleExcelFile, false);
  }

  handleExcelFile = (event) => {
    let files = event.target.files
    let f = files[0]
    let reader = new FileReader()
    let X = XLSX

    reader.onload = (e) => {
      let data = e.target.result
      let workbook = X.read(data, {type: "array"})
      let result = []
      workbook.SheetNames.forEach(function(sheetName) {
        var csv = X.utils.sheet_to_csv(workbook.Sheets[sheetName], {FS: "\t", RS: "\n"});
        if(csv.length){
          result.push("SHEET: " + sheetName);
          result.push("");
          result.push(csv);
        }
      });
      
      this.parseCSV(result[2])
    }

    reader.readAsArrayBuffer(f)
  }

  parseCSV = (csv) => {
    let rows = csv.split('\n')
    let attributes = rows[0].split('\t')

    let parsedAttributes = []
    attributes.forEach((str) => {
        str = str.replace(/\s+/g, '');
        parsedAttributes.push(str)

    })

    for(let i=1; i<rows.length-1; i++)
    {
      this.props.firebase.writeUser(parsedAttributes, rows[i].split('\t'))
    }

    this
            .props
            .firebase
            .readStudentsOnce()
            .then((value) => {
                if (value) 
                    this.props.updateTable(value)
            })
  }

  showData = () => {
    this.props.firebase.doArwin()
  }

  readExcel = () => {
    const node = this.ex.current
    node.click()
  }

  render() {

    return (
      <div>
          <button onClick={ this.readExcel } >Read Excel</button>
          <input ref={ this.ex } type="file" className="ex" />
      </div>
      
    );
  }
}

const ExcelButton = compose(
  withRouter,
  withFirebase,
)(ReadExcel);


export { ExcelButton };
