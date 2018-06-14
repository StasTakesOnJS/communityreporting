import React from 'react';
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
  componentWillMount() {
    this.addReport(reports[0]);
  }

  addReport(properties) {
    let functionCall = 'report';
    let props = properties;
    this.props.functionCallToAdd(functionCall,props);
  }

  render() {
    return (
      <div>
        <div id="report1" className="report"></div>
      </div>
    )
  }
}

export default Report;
