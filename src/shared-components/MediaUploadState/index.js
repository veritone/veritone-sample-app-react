import React, { Fragment } from 'react';
import { string, bool, element } from 'prop-types';
import cx from 'classnames';
import Divider from 'material-ui/Divider';

import styles from './styles/index.scss';

export default class MediaUploadState extends React.Component {
  static propTypes = {
    name: string,
    loading: bool,
    iconEl: element,
    divider: bool
  };
  static defaultProps = {};

  render() {
    const actionClassNames = cx(styles.action__name, {
      ['ellipsis-loading']: this.props.loading
    });

    return (
      <Fragment>
        {this.props.divider && <Divider />}

        <div className={styles.action}>
          <div className={actionClassNames}>{this.props.name}</div>
          <div className={styles.action__icon}>{this.props.iconEl}</div>
        </div>
      </Fragment>
    );
  }
}
