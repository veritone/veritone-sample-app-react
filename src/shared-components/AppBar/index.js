import React from 'react';
import { connect } from 'react-redux';
import { AppBar as LibAppBar } from 'veritone-react-common';
import { modules } from 'veritone-redux-common';

const { user } = modules;

class AppBar extends React.Component {
  render() {
    return (
      <LibAppBar
        // backgroundColor="#2196F3"
        currentAppName="React Sample App"
        appSwitcher
        profileMenu
        {...this.props}
      />
    );
  }
}

export default connect(
  state => ({
    user: user.selectUser(state),
    enabledApps: user.selectEnabledApps(state),
    enabledAppsFailedLoading: user.enabledAppsFailedLoading(state),
    isFetchingApps: user.isFetchingApps(state)
  }),
  { fetchEnabledApps: user.fetchEnabledApps }
)(AppBar);
