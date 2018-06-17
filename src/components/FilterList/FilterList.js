import React, {Component} from 'react';
import { Spinner,Button } from '@blueprintjs/core';
import './FilterList.css';

//TODO: the component is expected to pull all filters of an Ad Hoc view,
//parse type, values and selected values, and render all the filters
//based on the type and selected values. I'm going to need to find sliders,
//calendars, radio buttons etc to render all the possible types

let filters = [{
    resource: "/public/Samples/Ad_Hoc_Views/05__Unit_Sales_Trend",
    container: "#filters",
    params: {
      c_country_1: ["Mexico"],
    },
    // success: function (data) {
    //   console.log(data);
    // },
    error: function (e) {
      console.error(e);
    }
}];

class FilterList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Resource: filters[0],
      Parameters: {}
    }

    this.handleValuesChange = this.handleValuesChange.bind(this);
    this.saveFilterValues = this.saveFilterValues.bind(this);
    this.applyFilters = this.applyFilters.bind(this);
  }

  componentDidMount() {
    let resource = this.state.Resource;
    resource.success = this.saveFilterValues;
    resource.events = {};
    resource.events.change = this.handleValuesChange;
    this.setState({Resource: resource});
    this.addFilters(this.state.Resource);
  }

  addFilters(properties) {
    let functionCall = 'inputControls';
    let props = properties;
    this.props.functionCallToAdd(functionCall,props);
  }

  handleValuesChange(params) {
    this.setState({Parameters: params});
  }

  saveFilterValues(data) {
    this.setState({
      Parameters: data.parameters,
    });
  }

  //Read state of Viz passed from the App component, find Ad Hoc View with the
  //same resource URI as the filters, update with the current parameter values,
  //then update the local Viz and pass the updated value back to App component.
  applyFilters() {
    let state = this.state;
    let viz = this.props.returnViz;
    let filter = function(component) {
      return component.functionCall === "adhocView"
        && component.props.resource === state.Resource.resource;
    }

    const ahv = viz.find(filter);
    const ahvIndex = viz.findIndex(filter);

    ahv.props.params = this.state.Parameters;
    viz.splice(ahvIndex,1,ahv);

    this.props.updateViz(ahv, viz);
  }

  render() {
    return (
      <div id="filtersContainer1" className="filtersContainer">
        <div id="filters" className="filters">
          <div className="spinner">
            <Spinner />
          </div>
        </div>
        <Button id="applyButton" icon="refresh" text="Apply" onClick={this.applyFilters} />
      </div>
    )
  }
}

export default FilterList;
