import React from 'react';
import PersonIcon from 'material-ui/svg-icons/social/person';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';

import { PropTypes } from 'helpers/react';
const { string, func } = PropTypes;

// import styles from './styles/index';

export default class AppSwitcher extends React.Component {
  static propTypes = {
    className: string,
    onLogout: func.isRequired
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

  handleLogout = () => {
    this.props.onLogout();
  };

  render() {
    return (
      <IconMenu
        className={this.props.className}
        iconButtonElement={
          <IconButton style={{ fontSize: 'inherit' }}>
            <PersonIcon color="white" />
          </IconButton>
        }
        open={this.state.menuOpen}
        onRequestChange={this.handleOnRequestChange}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <MenuItem primaryText="Log out" onTouchTap={this.handleLogout} />
      </IconMenu>
    );
  }
}
