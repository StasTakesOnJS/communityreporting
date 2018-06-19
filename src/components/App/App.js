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
      vClient: {},
      Viz: [],
      SelectedTabId: 'tab1',
    };

    this.setVCLient = this.setVCLient.bind(this);
    this.addToViz = this.addToViz.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
    this.updateViz = this.updateViz.bind(this);
  }

  //Call visualize and render all the elements added to this.state.viz
  //Also adds the v client to the state.
  //Runs once all the child components are rendered.
  componentDidMount() {
    let setVClient = this.setVCLient;
    let viz = this.state.Viz;

    window.visualize.config(login);
    window.visualize(
      function(v) {
        //for loop has better performance compared to forEach()
        for (let i=0; i<viz.length; i++) {
          let e = v[viz[i].functionCall](viz[i].props);
          if (typeof(viz[i].callback) != 'undefined') {
            viz[i].callback(e);
          }
        }
        setVClient(v);
      }
    );
  }

  setVCLient(v) {
    this.setState({vClient: v});
  }

  //Callback function to populate this.state.viz from different child components
  addToViz(functionCall,props,callback) {
    let currentViz = this.state.Viz;
    currentViz.push({
      "functionCall": functionCall,
      "props": props,
      "callback": callback,
    })
    this.setState({Viz: currentViz});
  }

  //Handle clicks between Tabs
  handleTabChange(target) {
    this.setState({SelectedTabId: target});
  }

  //TODO: perhaps will have to change the type of componentToUpdate to an array
  //and iterate through its elements
  updateViz(componentToUpdate, viz) {
    this.setState({Viz: viz});
    let v = this.state.vClient;
    v[componentToUpdate.functionCall](componentToUpdate.props);
  }

  render() {
    return (
      <div id="tabs">
        <Tabs id="communityReports" onChange={this.handleTabChange} selectedTabId={this.state.selectedTabId} >
          <Tab id="tab1" title="Hey it's a report" panel={
            <div className="container">
              <FilterList functionCallToAdd={this.addToViz} returnViz={this.state.Viz}
                updateViz={this.updateViz} vClient={this.state.vClient} />
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
