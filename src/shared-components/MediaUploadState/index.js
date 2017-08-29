import React, { PropTypes } from 'react';
import styles from './styles/index.css';

const { string, any, bool } = PropTypes;

export default class MediaUploadState extends React.Component {
  static propTypes = {
    action: PropTypes.string,
    icon: PropTypes.any,
    isLoading: PropTypes.bool
  };
  static defaultProps = {};

  render() {
    const actionClassNames = this.props.isLoading
      ? 'action__name ellipsis-loading'
      : 'action__name';

    return (
      <div className='action'>
        <div className={actionClassNames}>
          {this.props.action}
        </div>
        <div className='action__icon'>
          {this.props.icon}
        </div>
      </div>
    );
  }
}
