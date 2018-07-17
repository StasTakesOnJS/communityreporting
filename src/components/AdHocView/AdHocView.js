import React, {Component} from 'react';
import { Spinner } from '@blueprintjs/core';
import './AdHocView.css';

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
