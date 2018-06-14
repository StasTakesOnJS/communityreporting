import React, {Component} from 'react';
import './App.css';
import Report from '../Report/Report';
import AdHocView from '../AdHocView/AdHocView';
import InputControls from '../InputControls/InputControls';
import FilterList from '../FilterList/FilterList';
import { login } from '../Login/Login';
import { Tab,Tabs } from '@blueprintjs/core';

// const tabsStyle = {
//   backgroundColor: "lightgrey",
// }

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viz: [],
    };

    this.addToViz = this.addToViz.bind(this);
  }

  //TODO find a way to create and pass add*() function to all child components,
  //so that within each child component i just call this add*() funciton and pass an
  //object with all properties (functionCall name, props, etc.)

  //Callback function to populate this.state.viz from different child components
  addToViz(functionCall,props) {
    let currentViz = this.state.viz;
    currentViz.push({
      "functionCall": functionCall,
      "props": props
    })
    this.setState({viz: currentViz});
  }

  //Call visualize and render all the elements added to this.state.viz
  //Runs once all the child components are rendered.
  componentDidMount() {
    let viz = this.state.viz;
    window.visualize(
      login,
      function(v) {
        for (let i=0; i<viz.length; i++) {
          v[viz[i].functionCall](viz[i].props);
        }
      }
    );
  }

  render() {
    return (
      // <div style={tabsStyle}>
      //   <Tabs id="communityReports" onChange={this.handleTabChange} selectedTabId="report1" >
      //     <Tab id="report1" title="Hey it's another report" panel={<AdHocView functionCallToAdd={this.addToViz} />} />
      //     <Tab id="report2" title="Hey it's another report" panel={<Report ic="ic1" report="report1" />} />
      //     <Tabs.Expander />
      //     <input className="pt-input" type="text" placeholder="Search..." />
      //   </Tabs>
      // </div>
      <div>
        <div>
          <FilterList functionCallToAdd={this.addToViz} />
          <AdHocView functionCallToAdd={this.addToViz} />
        </div>
        <div>
          <InputControls functionCallToAdd={this.addToViz} />
          <Report functionCallToAdd={this.addToViz} />
        </div>
      </div>
    )
  }
}

export default App;
