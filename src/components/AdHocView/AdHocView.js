import React, {Component} from 'react';
import './AdHocView.css';

class AdHocView extends Component {

  componentWillMount() {
    this.addAdHocView();
  }

  addAdHocView() {
    let functionCall = 'adhocView';
    let props = {
      resource: "/public/Samples/Ad_Hoc_Views/05__Unit_Sales_Trend",
      container: "#adhocContainer",
      success: function() {
        console.log("Ad Hoc view rendered!");
      },
      error: function(e) {
        console.log(e);
      }
    }
    this.props.functionCallToAdd(functionCall,props);
  }

  render() {
    return (
        <div id="adhocContainer"></div>
    );
  }
}

export default AdHocView;
