import React, {Component} from 'react';
import './App.css';
import Report from '../Report/Report';
import { login } from '../Login/Login';
import { Tab,Tabs } from '@blueprintjs/core';

const tabsStyle = {
  backgroundColor: "lightgrey",
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    login();
  }

  render() {
    return (
      <div style={tabsStyle}>
        <Tabs id="communityReports" onChange={this.handleTabChange} selectedTabId="report1" >
          <Tab id="report1" title="Hey it's another report" panel={<Report ic="ic1" report="report1" />} />
          <Tab id="report2" title="Hey it's another report" panel={<div>hello</div>} />
          <Tabs.Expander />
          <input className="pt-input" type="text" placeholder="Search..." />
        </Tabs>
      </div>
    )
  }
}

export default App;
