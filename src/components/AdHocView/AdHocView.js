import React, {Component} from 'react';
import { Spinner } from '@blueprintjs/core';
import './AdHocView.css';

// let adHocViews = [{
//   resource: "/public/Samples/Ad_Hoc_Views/05__Unit_Sales_Trend",
//   container: "#adhocContainer",
//   params: {
//     c_country_1: ["Mexico"],
//   },
//   success: function() {
//     console.log("Ad Hoc view rendered!");
//   },
//   error: function(e) {
//     console.log(e);
//   }
// }];

class AdHocView extends Component {
  componentDidMount() {
    this.addAdHocView(this.props.resource);
  }

  addAdHocView(properties) {
    let functionCall = 'adhocView';
    let props = properties;
    props.container = '#adhocContainer' + this.props.index;
    this.props.functionCallToAdd(functionCall,props);
  }

  render() {
    // let props = this.props.resource;
    return (
        <div id={'adhocContainer' + this.props.index} className="adHocView">
          <div className="spinner">
            <Spinner />
          </div>
        </div>
    );
  }
}

export default AdHocView;
