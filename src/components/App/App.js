import React, {Component} from 'react';
import AdHocView from '../AdHocView/AdHocView';
import FilterList from '../FilterList/FilterList';
import { login } from '../Login/Login';
import { Tab,Tabs } from '@blueprintjs/core';
import { vizObjects } from '../../VisualizeObjects/VisualizeObjects';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vClient: {},
      VizElements: [],
      RenderedElements: [],
      SelectedTabId: 'tab1',
    };

    this.setVCLient = this.setVCLient.bind(this);
    this.addToViz = this.addToViz.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
    this.updateViz = this.updateViz.bind(this);
  }

  //Call visualize and render all the elements added to this.state.viz
  //Also adds the v client to the state.
  //Runs once all the child components of App are rendered.
  componentDidMount() {
    let setVClient = this.setVCLient;
    let viz = this.state.VizElements;
    let renderedElements = [];
    //Initial visualize call
    window.visualize.config(login);
    window.visualize(
      function(v) {
        for (let i=0; i<viz.length; i++) {
          let e = v[viz[i].functionCall](viz[i].props);
          renderedElements.push(e);
          if (typeof(viz[i].callback) !== 'undefined') {
            viz[i].callback(e);
          }
        }
        setVClient(v);
      }
    );
    this.setState({RenderedElements: renderedElements})
  }

  componentDidUpdate() {
    //Using this atrocious approach because otherwise the Ad Hoc views and
    //Dashboards are not displayed when switching to a different tab,
    //unless the screen is resized or the report is re-run
    window.dispatchEvent(new Event('resize'));
  }

  //Assign Visualize.js client to state once it's established with the
  //visualize function
  setVCLient(v) {
    this.setState({vClient: v});
  }

  //Function to populate this.state.VizElements from different child components
  addToViz(functionCall,props,callback) {
    let currentViz = this.state.VizElements;
    currentViz.push({
      "functionCall": functionCall,
      "props": props,
      "callback": callback,
    });
    this.setState({VizElements: currentViz});
  }

  //Handle clicks between Tabs
  handleTabChange(current) {
    this.setState({SelectedTabId: current});
  }

  //Updates Ad Hoc Views based on selected filter values or when drilling down
  updateViz(componentsToUpdate, viz) {
    this.setState({VizElements: viz});
    let v = this.state.vClient;
    for (let i in componentsToUpdate) {
      v[componentsToUpdate[i].functionCall](componentsToUpdate[i].props);
    }
  }

  render() {
    return (
      <div id="tabs">
        <Tabs id="communityReports"
          onChange={this.handleTabChange}
          selectedTabId={this.state.SelectedTabId} >
          <Tab  id="tab1"
                title="KA Ratings Over Time"
                panel={
                  <div className="container">
                    <FilterList   functionCallToAdd={this.addToViz}
                                  returnViz={this.state.VizElements}
                                  updateViz={this.updateViz}
                                  resource={vizObjects.filters[0]}
                                  linkedTo={['_1_2','_1_3']}
                                  index="_1_1" />
                    <div className="half-screen-horizontal">
                      <AdHocView    functionCallToAdd={this.addToViz}
                                    returnViz={this.state.VizElements}
                                    updateViz={this.updateViz}
                                    resource={vizObjects.adHocViews[0]}
                                    drillsDownTo={['_1_3']}
                                    drillDownParams={`{
                                      "created_date_1": ["YEAR-100"],
                                      "created_date_2": ["YEAR-100"],
                                      "created_year_1": [],
                                      "month_name_1": []
                                    }`}
                                    index="_1_2" />
                    </div>
                    <div className="half-screen-horizontal">
                      <AdHocView    functionCallToAdd={this.addToViz}
                                    returnViz={this.state.VizElements}
                                    resource={vizObjects.adHocViews[2]}
                                    index="_1_3" />
                    </div>
                  </div>
                } />
          <Tab  id="tab2"
                title="KA Ratings By Author"
                panel={
                  <div className="container">
                    <FilterList   functionCallToAdd={this.addToViz}
                                  returnViz={this.state.VizElements}
                                  updateViz={this.updateViz}
                                  resource={vizObjects.filters[1]}
                                  linkedTo={['_2_2','_2_3']}
                                  index="_2_1" />
                    <div className="half-screen-horizontal">
                      <AdHocView    functionCallToAdd={this.addToViz}
                                    returnViz={this.state.VizElements}
                                    updateViz={this.updateViz}
                                    resource={vizObjects.adHocViews[1]}
                                    drillsDownTo={['_2_3']}
                                    drillDownParams={`{
                                      "mail_1": []
                                    }`}
                                    index="_2_2" />
                    </div>
                    <div className="half-screen-horizontal">
                      <AdHocView    functionCallToAdd={this.addToViz}
                                    returnViz={this.state.VizElements}
                                    resource={vizObjects.adHocViews[2]}
                                    index="_2_3" />
                    </div>
                  </div>
                } />
          <Tab  id="tab3"
                title="KA Views Over Time"
                panel={
                  <div className="container">
                    <FilterList   functionCallToAdd={this.addToViz}
                                  returnViz={this.state.VizElements}
                                  updateViz={this.updateViz}
                                  resource={vizObjects.filters[2]}
                                  linkedTo={['_3_2']}
                                  index="_3_1" />
                    <AdHocView    functionCallToAdd={this.addToViz}
                                  returnViz={this.state.VizElements}
                                  resource={vizObjects.adHocViews[3]}
                                  index="_3_2" />
                  </div>
                } />
          <Tab  id="tab4"
                title="Average # of KAs per month"
                panel={
                  <div className="container">
                    <FilterList   functionCallToAdd={this.addToViz}
                                  returnViz={this.state.VizElements}
                                  updateViz={this.updateViz}
                                  resource={vizObjects.filters[3]}
                                  linkedTo={['_4_2','_4_3']}
                                  index="_4_1" />
                    <div className="half-screen-horizontal">
                      <AdHocView    functionCallToAdd={this.addToViz}
                                    returnViz={this.state.VizElements}
                                    resource={vizObjects.adHocViews[4]}
                                    index="_4_2" />
                    </div>
                    <div className="half-screen-horizontal">
                      <AdHocView    functionCallToAdd={this.addToViz}
                                    returnViz={this.state.VizElements}
                                    resource={vizObjects.adHocViews[5]}
                                    index="_4_3" />
                    </div>
                  </div>
                } />
          <Tab  id="tab5"
                title="KA Comments"
                panel={
                  <div className="container">
                    <FilterList   functionCallToAdd={this.addToViz}
                                  returnViz={this.state.VizElements}
                                  updateViz={this.updateViz}
                                  resource={vizObjects.filters[4]}
                                  linkedTo={['_5_2','_5_3']}
                                  index="_5_1" />
                    <div className="half-screen-horizontal">
                      <AdHocView    functionCallToAdd={this.addToViz}
                                    returnViz={this.state.VizElements}
                                    resource={vizObjects.adHocViews[7]}
                                    index="_5_2" />
                    </div>
                    <div className="half-screen-horizontal">
                      <AdHocView    functionCallToAdd={this.addToViz}
                                    returnViz={this.state.VizElements}
                                    resource={vizObjects.adHocViews[6]}
                                    index="_5_3" />
                    </div>
                  </div>
                } />
      </Tabs>
        <div className="footer"></div>
      </div>
    )
  }
}

export default App;
