import React, {Component} from 'react';
import './FilterList.css';

//TODO: the component is expected to pull all filters of an Ad Hoc view,
//parse type, values and selected values, and render all the filters
//based on the type and selected values. I'm going to need to find sliders,
//calendars, radio buttons etc to render all the possible types

let filters = [{
    resource: "/public/Samples/Ad_Hoc_Views/05__Unit_Sales_Trend",
    container: "#filtersContainer1",
    success: function (data) {
      console.log(data);
    },
    error: function (e) {
      console.error(e);
    }
}];

class FilterList extends Component {
  componentWillMount() {
    this.addFilters(filters[0]);
  }

  addFilters(properties) {
    let functionCall = 'inputControls';
    let props = properties;
    this.props.functionCallToAdd(functionCall,props);
  }

  render() {
    return (
      <div id="filtersContainer1" className="filtersContainer"></div>
    )
  }
}

export default FilterList;
