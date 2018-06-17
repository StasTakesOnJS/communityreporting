import React from 'react';
import { Spinner } from '@blueprintjs/core';
import './Report.css';

let reports = [{
  resource: "/public/Samples/Reports/Cities",
  container: "#report1",
  success: function() {
    console.log("Report rendered!");
  },
  error: function(e) {
    console.log(e);
  }
}];

class Report extends React.Component {
  componentDidMount() {
    this.addReport(reports[0]);
  }

  addReport(properties) {
    let functionCall = 'report';
    let props = properties;
    this.props.functionCallToAdd(functionCall,props);
  }

  render() {
    return (
      <div id="report1" className="report">
        <div className="spinner">
          <Spinner />
        </div>
      </div>
    )
  }
}

export default Report;
