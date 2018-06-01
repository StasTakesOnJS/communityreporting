import React, {Component} from 'react';
import './Tab.css';

class Tab extends Component {
  render() {
    return (
      <div className="tabcontent">
        <h3>{this.props.label}</h3>
        <p>{this.props.contents}</p>
      </div>
    );
  }
}

export default Tab;
