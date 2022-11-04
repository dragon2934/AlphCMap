import React, {Component} from 'react';

// Import React Table
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";

class PropertiesManage extends React.Component {
  constructor() {
    super();
    this.state = {
      data: this.makeData()
    };
    this.renderEditable = this.renderEditable.bind(this);
  }
  range = len => {
    const arr = [];
    for (let i = 0; i < len; i++) {
      arr.push(i);
    }
    return arr;
  }
  newPerson() {
    const statusChance = Math.random();
    return {
      firstName: 'aa',
      lastName: 'bb',
      age: Math.floor(Math.random() * 30),
      visits: Math.floor(Math.random() * 100),
      progress: Math.floor(Math.random() * 100),
      status:
        statusChance > 0.66
          ? "relationship"
          : statusChance > 0.33 ? "complicated" : "single"
    };
  }
  makeData=(len = 5553) =>{
    return this.range(len).map(d => {
      return {
        ...this.newPerson(),
        children: this.range(10).map(this.newPerson)
      };
    });
  }
  renderEditable(cellInfo) {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.state.data];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ data });
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.data[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  }
  render() {
    const { data } = this.state;
    return (
      <div>
        <ReactTable
          data={data}
          columns={[
            {
              Header: "First Name",
              accessor: "firstName",
              Cell: this.renderEditable
            },
            {
              Header: "Last Name",
              accessor: "lastName",
              Cell: this.renderEditable
            },
            {
              Header: "Full Name",
              id: "full",
              accessor: d =>
                <div
                  dangerouslySetInnerHTML={{
                    __html: d.firstName + " " + d.lastName
                  }}
                />
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
      </div>
    );
  }
}
export default PropertiesManage;