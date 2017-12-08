import React from 'react';
import { objectOf, shape, string } from 'prop-types';
import NavigationCheck from 'material-ui-icons/Check';
import NavigationClose from 'material-ui-icons/Close';
import Divider from 'material-ui/Divider';

import MediaUploadState from 'shared-components/MediaUploadState';

export default class MediaUploadStates extends React.Component {
  static propTypes = {
    actions: objectOf(
      shape({
        name: string,
        status: string
      })
    )
  };

  render() {
    const iconStyles = {
      margin: 0 + 'auto'
    };

    const states = {
      loading: <div className="spinner" />,
      success: <NavigationCheck style={iconStyles} color="green" />,
      failed: <NavigationClose style={iconStyles} color="red" />
    };

    const actions = this.props.actions;

    return (
      <div>
        {actions &&
          Object.keys(actions).map((action, i) => (
            <div key={i}>
              {i > 0 && <Divider />}
              <MediaUploadState
                action={actions[action].name}
                icon={states[actions[action].status]}
                isLoading={actions[action].status === 'loading'}
              />
            </div>
          ))}
      </div>
    );
  }
}
