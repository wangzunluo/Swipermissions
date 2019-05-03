import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import XLSX from 'xlsx'

import { withFirebase } from '../Firebase';

class PageBase extends Component {

  componentDidMount() {
    this.ex.addEventListener("change", this.handleExcelFile, false);
  }

  componentWillUnmount() {
    this.ex.removeEventListener("change", this.handleExcelFile, false);
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
    

    for(let i=1; i<rows.length-1; i++)
    {
      console.log(rows[i].split('\t'))
      this.props.firebase.writeUser(attributes, rows[i].split('\t'))
    }
  }

  showData = () => {
    this.props.firebase.doArwin()
  }

  render() {

    return (
      <div>
        <button onClick={this.showData}>TEST</button>
        <input ref={elem => this.ex = elem} type="file" className="ex" />
      </div>
    );
  }
}

const HomePage = compose(
  withRouter,
  withFirebase,
)(PageBase);

export { HomePage };
