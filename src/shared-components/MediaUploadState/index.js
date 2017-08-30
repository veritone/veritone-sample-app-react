import React from 'react';
import propTypes from 'prop-types';
import './styles/index.css';

export default class MediaUploadState extends React.Component {
  static propTypes = {
    action: propTypes.string,
    icon: propTypes.any,
    isLoading: propTypes.bool
  };
  static defaultProps = {};

  render() {
    const actionClassNames = this.props.isLoading
      ? 'action__name ellipsis-loading'
      : 'action__name';

    return (
      <div className="action">
        <div className={actionClassNames}>
          {this.props.action}
        </div>
        <div className="action__icon">
          {this.props.icon}
        </div>
      </div>
    );
  }
}
