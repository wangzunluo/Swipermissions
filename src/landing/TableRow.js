import React, { Component } from 'react';
import './TableRow.css'

class TableRow extends Component
{

  constructor(props) {
    super(props);
    if (this.props.available === "Available")
    {
      var styleType = "AvailableStyle";
    }
    else
    {
      var styleType = "UnavailableStyle";
    }
    this.state = 
    {
      cellStyle: styleType
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event)
  {
    if (this.props.available === "Available")
    {
      this.setState({cellStyle: "UnavailableStyle"});
    }
    else
    {
      this.setState({cellStyle: "AvailableStyle"});
    }
  }

  render()
  {
    

    return (
      <tr className="TableRow" onClick={this.handleClick}>
        <td>{this.props.name}</td>
        <td className= {this.state.cellStyle} >{this.props.available}</td>
        
      </tr>
    )
  }
}

export default TableRow