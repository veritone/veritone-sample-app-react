import React from 'react';

import ExpandingContainer from 'shared-components/ExpandingContainer';
import PropTypes from 'prop-types';

import './styles/index.css';

const { number, string, arrayOf, objectOf, node, any, bool } = PropTypes;

export default class RequestBar extends React.Component {
  static propTypes = {
    id: number,
    description: string,
    endpoint: string,
    parameters: objectOf(any),
    fields: arrayOf(any),
    expanded: bool,
    button: node
  };
  static defaultProps = {
    expanded: false
  };

  render() {
    return (
      <div className="requestBar">
        <div className="requestBar__header">
          <div>
            <div>
              {this.props.id}. {this.props.description}
            </div>
            {this.props.endpoint &&
              <small className="requestBar__endpoint">
                {this.props.endpoint}
              </small>}
          </div>
          <div className="requestBar__btn-container">
            {!this.props.expanded && this.props.button}
          </div>
        </div>
        <ExpandingContainer defaultExpanded={this.props.expanded}>
          {this.props.children}
        </ExpandingContainer>
      </div>
    );
  }
}
