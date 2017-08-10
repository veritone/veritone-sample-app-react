import React from 'react';
import { Row, Col } from 'shared-components/grid';
import { PropTypes } from 'prop-types';
import fetch from 'node-fetch';

//const { string, func } = PropTypes;

class Request extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasData: false
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    fetch(this.props.endpoint, this.props.parameters)
    .then(res => res.json())
    .then(json => {
      this.setState({
        hasData: true,
        ...json
      });
    });
  };
  componentDidMount() {
    // nothing
  };
  render() {
    let fieldArray = [];
    for (var property in this.state) {
      const propertyValue = this.state[property];
      if (this.state.hasOwnProperty(property) && Array.isArray(propertyValue) && propertyValue.length > 0 ) {
        let subPropertyFieldArray = [];
        for (var subProperty in propertyValue) {
          const arraystringify = JSON.stringify(propertyValue[subProperty]);
          subPropertyFieldArray.push(<li key={ 'sub-field-' + subProperty }><span>{ subProperty }:</span> {arraystringify}</li>);
        }
        fieldArray.push(<li key={ 'field-' + property }><span>{property}:</span><ul>{subPropertyFieldArray}</ul></li>);
      } else if (this.state.hasOwnProperty(property) && this.props.fields.includes(property) ) {
        fieldArray.push(<li key={ 'field-' + property }><span>{property}:</span> { propertyValue }</li>);
      }
    }
    return (
      <Row className="cta">
        <Col sm={12} lg={10}>
        { this.props.index }. { this.props.description }<br />
          <small>{ this.props.endpoint }</small>
        </Col>
        <Col sm={12} lg={2}>
          <button onClick={this.handleClick} className="cta__button--blue"><span />Request</button>
        </Col>
        { this.state.hasData &&
        <Col sm={12} lg={12}>
          <div className="cta__details">
            <ul>
              {fieldArray}
            </ul>
          </div>
        </Col>
        }
      </Row>
    );
  }
}

export { Request };
