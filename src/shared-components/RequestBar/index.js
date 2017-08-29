import React from 'react';

import ExpandingContainer from 'shared-components/ExpandingContainer';
import { PropTypes } from 'helpers/react';

import './styles/index.css';

const { number, string, arrayOf, objectOf, func, any, bool } = PropTypes;


export default class RequestBar extends React.Component {
  static propTypes = {
    id: number,
    description: string,
    endpoint: string,
    parameters: objectOf(any),
    fields: arrayOf(any),
    expanded: bool,
    button: any,
    onClick: func
  };
  static defaultProps = {
    expanded: false
  };

  render() {
    const defaultBtn = (
      <button className="requestBar__btn" onClick={this.props.onClick}>
        Request
      </button>
    );
    const button = !this.props.expanded ? (this.props.button || defaultBtn) : null;

    const endpointMarkup = (
      <small className='requestBar__endpoint'>
        { this.props.endpoint }
      </small>
    );
    const endpoint = this.props.endpoint ? endpointMarkup : null;

    return (
      <div className='requestBar'>
        <div className='requestBar__header'>
          <div>
            <div>
              { this.props.id }. { this.props.description }
            </div>
            { endpoint }
          </div>
          <div className='requestBar__btn-container'>
            { button }
          </div>
        </div>
        <ExpandingContainer
            defaultExpanded={this.props.expanded}
          >
          { this.props.children }
        </ExpandingContainer>
      </div>
    );
  }
}