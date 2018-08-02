import React, {Component} from 'react';
import { Spinner } from '@blueprintjs/core';
import './Dashboard.css';

// let Dashboards = [{
//   resource: "/public/Jaspersoft_Community_Wiki_Reporting/Dashboards/Ratings_Over_Time",
//   container: "#dashboardContainer",
//   success: function() {
//     console.log("Dashboard rendered!");
//   },
//   error: function(e) {
//     console.log(e);
//   }
// }];

class Dashboard extends Component {
  componentDidMount() {
    this.addDashboard(this.props.resource);
  }

  addDashboard(properties) {
    let functionCall = 'dashboard';
    let props = properties;
    props.container = '#dashboardContainer' + this.props.index;
    this.props.functionCallToAdd(functionCall,props);
  }

  render() {
    return (
      <div id={'dashboardContainer' + this.props.index} className="dashboard">
        <div className="spinner">
          <Spinner />
        </div>
      </div>
    );
  }
}

export default Dashboard;
