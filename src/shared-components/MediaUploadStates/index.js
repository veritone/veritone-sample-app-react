import React from 'react';
import { arrayOf, shape, string, bool } from 'prop-types';
import NavigationCheck from 'material-ui-icons/Check';
import NavigationClose from 'material-ui-icons/Close';
import { CircularProgress } from 'material-ui/Progress';

import MediaUploadState from 'shared-components/MediaUploadState';

export default class MediaUploadStates extends React.Component {
  static propTypes = {
    steps: arrayOf(
      shape({
        name: string
      })
    ).isRequired,
    running: bool.isRequired,
    success: bool.isRequired,
    failure: bool.isRequired
  };

  render() {
    const iconStyles = {
      margin: '0 auto'
    };

    const stateIcons = {
      loading: <CircularProgress size={30}/>,
      success: <NavigationCheck style={iconStyles} color="green" />,
      failed: <NavigationClose style={iconStyles} color="red" />
    };

    let currentStateEl = {
      [this.props.running]: stateIcons.loading,
      [this.props.failure]: stateIcons.failed,
      [this.props.success]: stateIcons.success
    }[true];

    return (
      <div>
        {this.props.steps.map(({ name }, i) => {
          const isLast = i === this.props.steps.length - 1;

          return (
            <MediaUploadState
              name={name}
              divider={i > 0}
              iconEl={isLast ? currentStateEl : stateIcons.success}
              loading={
                isLast &&
                this.props.running &&
                !this.props.failure &&
                !this.props.success
              }
              key={name}
            />
          );
        })}
      </div>
    );
  }
}
