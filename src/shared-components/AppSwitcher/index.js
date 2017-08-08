import React from 'react';
import { PropTypes } from 'helpers/react';

import AppSwitcherList from 'shared-components/AppSwitcherList';
import AppSwitcherErrorState from 'shared-components/AppSwitcherErrorState';

import AppsIcon from 'material-ui/svg-icons/navigation/apps';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';

import styles from './styles/index.scss';

const { string, arrayOf, shape, bool, func } = PropTypes;

export default class AppSwitcher extends React.Component {
  static propTypes = {
    className: string,
    enabledApps: arrayOf(
      shape({
        applicationId: string,
        applicationName: string,
        applicationIconSvg: string,
        applicationIconUrl: string
      })
    ),
    isFetchingApps: bool,
    enabledAppsFailedLoading: bool,
    handleRefresh: func
  };
  static defaultProps = {};
  state = {
    menuOpen: false
  };
  handleOnRequestChange = value => {
    this.setState({
      menuOpen: value
    });
  };
  render() {
    return (
      <div>
        <IconMenu
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          iconButtonElement={
            <IconButton
              style={{
                fontSize: 'inherit',
                paddingRight: 4
              }}
            >
              <AppsIcon color="white" />
            </IconButton>
          }
          open={this.state.menuOpen}
          onRequestChange={this.handleOnRequestChange}
        >
          <AppSwitcherList enabledApps={this.props.enabledApps} />
        </IconMenu>
        <span className={styles['appSwitcher__title']}>Developer</span>
      </div>
    );
  }
}
