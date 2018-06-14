import React, {Component} from 'react';
import './AdHocView.css';

let adHocViews = [{
  resource: "/public/Samples/Ad_Hoc_Views/05__Unit_Sales_Trend",
  container: "#adhocContainer",
  success: function() {
    console.log("Ad Hoc view rendered!");
  },
  error: function(e) {
    console.log(e);
  }
}];

class AdHocView extends Component {
  componentWillMount() {
    this.addAdHocView(adHocViews[0]);
  }

  addAdHocView(properties) {
    let functionCall = 'adhocView';
    let props = properties;
    this.props.functionCallToAdd(functionCall,props);
  }

  render() {
    return (
        <div id="adhocContainer" className="adHocView"></div>
    );
  }
}

export default AdHocView;
