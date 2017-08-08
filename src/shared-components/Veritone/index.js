import React from 'react';
import cx from 'classnames';
import { Container, Row, Col } from 'shared-components/grid';
import { PropTypes } from 'helpers/react';

const { string } = PropTypes;

const Request = ({ className, index, description, endpoint, ...props }) => (
  <Row className="cta">
    <Col sm={12} lg={10}>
    { index }. { description }<br />
      <small>{ endpoint }</small>
    </Col>
    <Col sm={12} lg={2}>
      <button onClick={this.handleClick} className="cta__button--blue"><span />Request</button>
    </Col>
  </Row>
);

Request.handleClick = () => {
  console.log('test');
};

Request.propTypes = {
  className: string,
  index: string,
  description: string,
  endpoint: string
};

export { Request };
