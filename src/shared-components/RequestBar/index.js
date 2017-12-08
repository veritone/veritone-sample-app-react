import React from 'react';

import ExpandingContainer from 'shared-components/ExpandingContainer';
import { number, string, arrayOf, objectOf, node, any, bool } from 'prop-types';

import styles from './styles/index.scss';

export default class RequestBar extends React.Component {
  static propTypes = {
    id: number,
    description: string,
    endpoint: string,
    parameters: objectOf(any),
    fields: arrayOf(any),
    expanded: bool,
    button: node,
    children: node
  };
  static defaultProps = {
    expanded: false
  };

  render() {
    return (
      <div className={styles.requestBar}>
        <div className={styles.requestBar__header}>
          <div>
            <div>
              {this.props.id}. {this.props.description}
            </div>
            {this.props.endpoint && (
              <small className={styles.requestBar__endpoint}>
                {this.props.endpoint}
              </small>
            )}
          </div>
          <div className={styles['requestBar__btn-container']}>
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
