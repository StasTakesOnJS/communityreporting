import React from 'react';
import './Report.css';
import { Tab,Tabs } from '@blueprintjs/core';


class Report extends React.Component {
  componentWillMount() {
    this.addReport();
  }

  addReport() {
    let functionCall = 'report';
    let props = {
      resource: "/public/Samples/Reports/Cities",
      container: "#report1",
      success: function() {
        console.log("Report rendered!");
      },
      error: function(e) {
        console.log(e);
      }
    }
    this.props.functionCallToAdd(functionCall,props);
  }

  render() {
    return (
      <div id="container">
        <div id="ic1">
            <div><p>Loading...</p></div>
        </div>
        <div id="report1"></div>
      </div>
    )
  }
}

export default Report;
