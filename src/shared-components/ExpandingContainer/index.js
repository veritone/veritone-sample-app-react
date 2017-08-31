import React from 'react';

import styles from './styles/index.scss';

import propTypes from 'prop-types';
const { bool } = propTypes;

export default class ExpandingContainer extends React.Component {
  static propTypes = {
    defaultExpanded: bool
  };
  static defaultProps = {
    defaultExpanded: false
  };

  state = {
    open: this.props.defaultExpanded
  };

  componentWillUpdate(nextProps) {
    if (nextProps.defaultExpanded !== this.props.defaultExpanded) {
      this.setState({
        open: nextProps.defaultExpanded
      });
    }
  }

  toggleState = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    return (
      <div className={styles['container']}>
        <div className={styles['title-content']}>
          {this.state.open && this.props.children}
        </div>
      </div>
    );
  }
}
