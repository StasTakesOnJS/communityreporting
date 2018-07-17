import React, {Component} from 'react';
import './App.css';
import Report from '../Report/Report';
import AdHocView from '../AdHocView/AdHocView';
import InputControls from '../InputControls/InputControls';
import Dashboard from '../Dashboard/Dashboard';
import FilterList from '../FilterList/FilterList';
import { login } from '../Login/Login';
import { Tab,Tabs } from '@blueprintjs/core';
import { vizObjects } from '../../VisualizeObjects/VisualizeObjects';


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
  //Runs once all the child components are rendered.
  componentDidMount() {
    let setVClient = this.setVCLient;
    let viz = this.state.VizElements;
    let renderedElements = [];

    //Initial visualize call
    window.visualize.config(login);
    window.visualize(
      function(v) {
        //for loop has better performance compared to forEach()
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
    console.log('Yeet');
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

  //Function to populate this.state.viz from different child components
  addToViz(functionCall,props,callback) {
    let currentViz = this.state.VizElements;
    currentViz.push({
      "functionCall": functionCall,
      "props": props,
      "callback": callback,
    })
    this.setState({VizElements: currentViz});
  }

  //Handle clicks between Tabs
  handleTabChange(current) {
    this.setState({SelectedTabId: current});
  }

  //Right now only used to update Ad Hoc Views based on selected filter values
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
                title="Hey it's a report"
                panel={
                  <div className="container">
                    <FilterList   functionCallToAdd={this.addToViz}
                                  returnViz={this.state.VizElements}
                                  updateViz={this.updateViz}
                                  vClient={this.state.vClient}
                                  resource={vizObjects.filters[0]}
                                  linkedTo={[vizObjects.adHocViews[0],vizObjects.adHocViews[1]]}
                                  index="_1_1" />
                    <div className="half-screen">
                      <AdHocView    functionCallToAdd={this.addToViz}
                                    resource={vizObjects.adHocViews[1]}
                                    index="_1_2" />
                    </div>
                    <div className="half-screen">
                      <AdHocView    functionCallToAdd={this.addToViz}
                                    resource={vizObjects.adHocViews[0]}
                                    index="_1_3" />
                    </div>
                  </div>
                } />
          <Tab  id="tab2"
                title="Hey it's another report. It has a long name."
                panel={
                  <div className="container">
                      <Report functionCallToAdd={this.addToViz}
                              resource={vizObjects.reports[0]}
                              index="_2_1"/>
                  </div>
                } />
          <Tab  id="tab3"
                title="Hey it's a Dashboard tab"
                panel={
                  <div className="container">
                      <Dashboard functionCallToAdd={this.addToViz}
                                 resource={vizObjects.dashboards[0]}
                                 index="_3_1" />
                  </div>
                } />
        </Tabs>
        <div className="footer"></div>
      </div>
    )
  }
}

export default App;


// <Tab  id="tab4"
//       title="Hey it's another report"
//       panel={
//         <div className="container">
//             <FilterList   functionCallToAdd={this.addToViz}
//                           returnViz={this.state.VizElements}
//                           updateViz={this.updateViz}
//                           vClient={this.state.vClient}
//                           resource={vizObjects.filters[1]}
//                           index="_4_1" />
//             <AdHocView    functionCallToAdd={this.addToViz}
//                           resource={vizObjects.adHocViews[1]}
//                           index="_4_2" />
//           </div>
//         }
//        />
// <Tab  id="tab5"
//       title="Hey it's a Table report"
//       panel={
//         <div className="container">
//             <FilterList   functionCallToAdd={this.addToViz}
//                           returnViz={this.state.VizElements}
//                           updateViz={this.updateViz}
//                           vClient={this.state.vClient}
//                           resource={vizObjects.filters[2]}
//                           index="_5_1" />
//             <AdHocView    functionCallToAdd={this.addToViz}
//                           resource={vizObjects.adHocViews[2]}
//                           index="_5_2" />
//         </div>
//      }
//      />
// <Tab  id="tab6"
//       title="Hey it's a Crosstab report"
//       panel={
//          <div className="container">
//             <AdHocView    functionCallToAdd={this.addToViz}
//                           resource={vizObjects.adHocViews[3]}
//                           index="_6_2" />
//          </div>
//       }
//       />
