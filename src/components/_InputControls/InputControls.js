import React, {Component} from 'react';
import { Spinner } from '@blueprintjs/core';
import './InputControls.css';

let inputControls = [{
    resource: "/public/Samples/Reports/Cities",
    container: "#inputContainer1",
    success: function () {
      console.log("Input Controls rendered!");
    },
    error: function (e) {
      console.error(e);
    }
}];

class InputControls extends Component {
  componentDidMount() {
    this.addInputControls(inputControls[0]);
  }

  addInputControls(properties) {
    let functionCall = 'inputControls';
    let props = properties;
    this.props.functionCallToAdd(functionCall,props);
  }

  render() {
    return (
      <div id="inputContainer1" className="inputContainer">
        <div className="spinner">
          <Spinner />
        </div>
      </div>
    )
  }
};

export default InputControls;
