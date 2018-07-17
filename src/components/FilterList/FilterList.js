import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Spinner,Button,ButtonGroup } from '@blueprintjs/core';
import './FilterList.css';

//TODO: alternatively, the component is expected to pull all filters of an
//Ad Hoc view, parse type, values and selected values, and render all the
//filters based on the type and selected values. I'm going to need to find
//sliders, calendars, radio buttons etc to render all the possible types

class FilterList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Resource: this.props.resource,
      Parameters: {},
      vElement: {},
    }

    this.setVElement = this.setVElement.bind(this);
    this.handleValuesChange = this.handleValuesChange.bind(this);
    this.saveFilterValues = this.saveFilterValues.bind(this);
    this.applyFilters = this.applyFilters.bind(this);
    this.refreshFilterValues = this.refreshFilterValues.bind(this);
    this.reRender = this.reRender.bind(this);
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
    let callback = this.setVElement;
    props.container = '#filtersContainer' + this.props.index;
    this.props.functionCallToAdd(functionCall,props,callback);
  }

  setVElement(e) {
    this.setState({vElement: e});
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
    let viz = this.props.returnViz;
    let linkedTo = this.props.linkedTo;
    let updatedAdHocViews = [];
    for (let i in linkedTo) {
      //Filter condition to look up Ad Hoc Views linked to the currentViz
      //instance of filters in the current Tab
      let filter = function(component) {
        return component.functionCall === "adhocView"
          && component.props.resource === linkedTo[i].resource;
      }

      const ahv = viz.find(filter);
      const ahvIndex = viz.findIndex(filter);

      //Add parameters from current state.Parameters to the object which is
      //used to re-render an Ad Hoc view
      ahv.props.params = this.state.Parameters;
      viz.splice(ahvIndex,1,ahv);
      updatedAdHocViews.push(ahv);
    }
    this.props.updateViz(updatedAdHocViews, viz);
  }

  refreshFilterValues() {
    this.state.vElement.reset();
  }

  reRender() {
    this.state.vElement.render();
  }

  render() {
    return (
      <div id="filtersContainer1" className="filtersContainer">
        <div id={"filtersContainer" + this.props.index} className="filters">
          <div className="spinner">
            <Spinner />
          </div>
        </div>
        <ButtonGroup fill={true}>
          <Button className="applyButton"
            onClick={this.applyFilters}>
            Apply</Button>
          <Button className="refreshButton"
            onClick={this.refreshFilterValues}>
            Refresh</Button>
        </ButtonGroup>
      </div>
    )
  }
}

FilterList.propTypes = {
  vClient: PropTypes.func,
  updateViz: PropTypes.func,
  returnViz: PropTypes.array,
  functionCallToAdd: PropTypes.func,
  resource: PropTypes.object,
  linkedTo: PropTypes.array,
  index: PropTypes.string,
}

export default FilterList;
