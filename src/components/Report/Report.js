import React from 'react';
import './Report.css';


class Report extends React.Component {
  constructor(props) {
    super(props);
    this.renderReport = this.renderReport.bind(this);
  }

  componentDidMount() {
    this.renderReport();
  }

  renderReport() {
    window.visualize({
        auth: {
            name: "joeuser",
            password: "joeuser"
        }
    }, function (v) {

    		let resourceUri = "/public/Jaspersoft_Community_Wiki_Reporting/Article_Views";

        let report = v.report({
        		resource: resourceUri,
            container: "#report"
        });

         let inputControls = v.inputControls({
        		resource: resourceUri,
        		container: "#ic",
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
        <h1>Here comes nothing</h1>
        <div id="container">
          <div id="ic">
              <div><p>Loading...</p></div>
          </div>
          <div id="report"></div>
        </div>
      </div>
    )
  }
}

export default Report;
