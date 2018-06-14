import React, {Component} from 'react';
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
  componentWillMount() {
    this.addInputControls(inputControls[0]);
  }

  addInputControls(properties) {
    let functionCall = 'inputControls';
    let props = properties;
    this.props.functionCallToAdd(functionCall,props);
  }

  render() {
    return (
        <div id="inputContainer1" className="inputContainer"></div>
    )
  }
};

export default InputControls;
