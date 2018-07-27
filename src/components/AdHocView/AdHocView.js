import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Spinner } from '@blueprintjs/core';
import './AdHocView.css';

class AdHocView extends Component {
  componentDidMount() {
    this.addAdHocView(this.props.resource);
  }

  addAdHocView(properties) {
    let functionCall = 'adhocView';
    let props = this.clone(properties);
    props.container = '#adhocContainer' + this.props.index;

    //Add linkOptions and handle drill down if AdHocView component has
    //drillsDownTo property
    if (typeof(this.props.drillsDownTo) !== 'undefined') {
      let updateViz = this.props.updateViz;
      let vizElements = this.props.returnViz;
      let drillsDownTo = this.props.drillsDownTo;
      let drillDownParams = this.props.drillDownParams;
      props.linkOptions = {
        events: {
          click: function(ev, link) {
            let updatedAdHocViews = [];
            for (let i in drillsDownTo) {
              let filter = function(component) {
                return component.functionCall === "adhocView"
                  && component.props.container.includes(drillsDownTo[i]);
              }

              const ahv = vizElements.find(filter);
              const ahvIndex = vizElements.findIndex(filter);

              //Some dark sorcery to map specific properties of the link
              //to the parameters being passed to drill down Ad Hoc View(s)
              let params = JSON.parse(drillDownParams);
              for (let key in params) {
                if (params.hasOwnProperty(key)) {
                  if (params[key].length === 0) {
                    let linkFieldName = key.split('').reverse().slice(2).reverse().join('');
                    for (let fieldName in link) {
                      if (fieldName.includes(linkFieldName)) {
                        if (isNaN(link[fieldName])) {
                          params[key] = [link[fieldName]];
                        } else {
                          params[key] = [parseInt(link[fieldName], 10)];
                        }
                      }
                    }
                  }
                }
              }
              //End of dark sorcery

              ahv.props.params = params;
              vizElements.splice(ahvIndex,1,ahv);
              updatedAdHocViews.push(ahv);
            }
            updateViz(updatedAdHocViews, vizElements);
          }
        }
      }
    }
    this.props.functionCallToAdd(functionCall,props);
  }

  clone(obj){
    if(obj == null || typeof(obj) !== 'object')
        return obj;

    let temp = new obj.constructor();
    for(var key in obj)
        temp[key] = this.clone(obj[key]);

    return temp;
  }

  render() {
    return (
        <div id={'adhocContainer' + this.props.index} className="adHocView">
          <div className="spinner">
            <Spinner />
          </div>
        </div>
    );
  }
}

AdHocView.propTypes = {
  functionCallToAdd: PropTypes.func,
  updateViz: PropTypes.func,
  returnViz: PropTypes.array,
  drillsDownTo: PropTypes.array,
  drillDownParams: PropTypes.string,
  resource: PropTypes.object,
  index: PropTypes.string,
}

export default AdHocView;
