import React from 'react';
import './Report.css';
import { Tab,Tabs } from '@blueprintjs/core';


class Report extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      r: this.props.report,
      ic: this.props.ic
    }

    this.renderReport = this.renderReport.bind(this);
  }

  componentDidMount() {
    this.renderReport();
  }

  renderReport() {
    window.visualize(
      function (v) {

    		let resourceUris = [
          {
            name:'Cities',
            uri: '/public/Samples/Reports/Cities'
          },
          {
            name: 'Article_Views',
            uri: '/public/Jaspersoft_Community_Wiki_Reporting/Article_Views'
          }
        ];

        let report = v.report({
        		resource: resourceUris[0].uri,
            container: "#report1"
        });

        let inputControls = v.inputControls({
        		resource: resourceUris[0].uri,
        		container: "#ic1",
            events: {
            	change: function(params, error){
              	if (!error){
                	report.params(params).run();
                }
              }
            },
            success: function(data) {
              console.log(data);
            }
        });
    });
  }

  render() {
    return (
      <div>
        <div id="container">
          <div id={this.state.ic}>
              <div><p>Loading...</p></div>
          </div>
          <div id={this.state.r}></div>
        </div>
      </div>
    )
  }
}

export default Report;
