import React, { Component } from 'react';
import { Row, Col } from 'shared-components/grid';
import { PropTypes } from 'prop-types';
import fetch from 'node-fetch';
import { User } from 'modules/user';

const { string, func } = PropTypes;

class Request extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasData: false
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    fetch(this.props.endpoint, User.requestParameters)
    .then(res => res.json())
    .then(json => {
      this.setState({
        userid: json.userId,
        apiToken: json.apiToken,
        hasData: true
      });
    });
  };
  componentDidMount() {
    // nothing
  };
  render() {
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
          <div>
            <ul>
              <li>UserId: { this.state.userid }</li>
              <li>ApiToken: { this.state.apiToken }</li>
            </ul>
          </div>
        </Col>
        };
      </Row>
    );
  }
}

export { Request };
