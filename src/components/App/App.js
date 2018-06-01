import React, {Component} from 'react';
import './App.css';
import Report from '../Report/Report';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
        <Report />
    )
  }
}

export default App;
