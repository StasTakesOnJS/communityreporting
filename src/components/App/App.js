import React, {Component} from 'react';
import './App.css';
import Report from '../Report/Report';
import AdHocView from '../AdHocView/AdHocView';
import InputControls from '../InputControls/InputControls';
import FilterList from '../FilterList/FilterList';
import { login } from '../Login/Login';
import { Tab,Tabs } from '@blueprintjs/core';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Viz: [],
      SelectedTabId: 'tab1',
    };

    this.addToViz = this.addToViz.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
    this.updateViz = this.updateViz.bind(this);
  }

  //TODO find a way to create and pass add*() function to all child components,
  //so that within each child component i just call this add*() funciton and pass an
  //object with all properties (functionCall name, props, etc.)

  //Call visualize and render all the elements added to this.state.viz
  //Runs once all the child components are rendered.
  componentDidMount() {
    let viz = this.state.Viz;
    window.visualize(
      login,
      function(v) {
        for (let i=0; i<viz.length; i++) {
          v[viz[i].functionCall](viz[i].props);
        }
      }
    );
  }

  //Callback function to populate this.state.viz from different child components
  addToViz(functionCall,props) {
    let currentViz = this.state.Viz;
    currentViz.push({
      "functionCall": functionCall,
      "props": props
    })
    this.setState({Viz: currentViz});
  }

  //Handle clicks between Tabs
  handleTabChange(target) {
    this.setState({SelectedTabId: target});
  }

  updateViz(componentToUpdate, viz) {
    console.log(componentToUpdate);
    this.setState({Viz: viz});
    window.visualize(
      function(v) {
        v[componentToUpdate.functionCall](componentToUpdate.props);
      }
    );
  }

  render() {
    return (
      <div id="tabs">
        <Tabs id="communityReports" onChange={this.handleTabChange} selectedTabId={this.state.selectedTabId} >
          <Tab id="tab1" title="Hey it's a report" panel={
            <div className="container">
              <FilterList functionCallToAdd={this.addToViz} returnViz={this.state.Viz}
                updateViz={this.updateViz} />
              <AdHocView functionCallToAdd={this.addToViz} />
            </div>
          } />
          <Tab id="tab2" title="Hey it's another report. It has a long name." panel={
            <div className="container">
              <InputControls functionCallToAdd={this.addToViz} />
              <Report functionCallToAdd={this.addToViz} />
            </div>
          } />
          <Tabs.Expander />
        </Tabs>
        <div className="footer"></div>
      </div>
    )
  }
}

export default App;
