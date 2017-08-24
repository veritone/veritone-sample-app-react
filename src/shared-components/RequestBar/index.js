import React from 'react';
import { Row, Col } from 'shared-components/grid';
import { PropTypes } from 'helpers/react';
const { number, string, arrayOf, objectOf, func, any } = PropTypes;

export default class RequestBar extends React.Component {
  static propTypes = {
    id: number.isRequired,
    description: string,
    endpoint: string.isRequired,
    parameters: objectOf(any),
    fields: arrayOf(any),
    onclick: func
  };
  static defaultProps = {};

  render() {
    return (
      <Row className="cta">
        <Col sm={12} lg={10}>
          <Row>
            <div>
              { this.props.id }. { this.props.description }
            </div>
          </Row>
          <Row>
            <small>
              { this.props.endpoint }
            </small>
          </Row>
        </Col>
        <Col sm={12} lg={2}>
          <Row>
            <button className="cta__button--blue" onClick={this.props.onclick}>
              Request
            </button>
          </Row>
        </Col>
        { false &&
          <Col sm={12} lg={12}>
            <div className="cta__details">
              <ul>
                {/* {fieldArray} */}
              </ul>
            </div>
          </Col>
        }
      </Row>
    );
  }
}
