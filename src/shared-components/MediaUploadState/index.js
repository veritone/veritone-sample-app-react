import React from 'react';
import propTypes from 'prop-types';
import cx from 'classnames';
import styles from './styles/index.scss';

export default class MediaUploadState extends React.Component {
  static propTypes = {
    action: propTypes.string,
    icon: propTypes.any,
    isLoading: propTypes.bool
  };
  static defaultProps = {};

  render() {
    const actionClassNames = cx(styles.action__name, {
      ['ellipsis-loading']: this.props.isLoading
    });

    return (
      <div className={styles.action}>
        <div className={actionClassNames}>{this.props.action}</div>
        <div className={styles.action__icon}>{this.props.icon}</div>
      </div>
    );
  }
}
