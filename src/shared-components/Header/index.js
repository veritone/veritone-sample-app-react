import React from 'react';
import cx from 'classnames';

import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import { Logo } from 'shared-components/Branding';

import IconButton from 'material-ui/IconButton';
import AppSwitcher from 'shared-components/AppSwitcher';
import ProfileMenu from 'shared-components/ProfileMenu';

import CloseIcon from 'material-ui/svg-icons/navigation/close';

const Header = (props = {}) => {
  const {
    className,
    appSwitcher,
    enabledAppsFailedLoading,
    enabledApps,
    isFetchingApps,
    handleRefresh,
    logout,
    profileMenu,
    closeButton,
    onClose
  } = props;
  return (
    <div className={cx('header', className, {
      ['header--fixed']: true,
      ['header--centered']: true
    })}>
      <Toolbar className='appToolBar'>
        <ToolbarGroup>
          <Logo link="https://www.veritone.com" />
        </ToolbarGroup>
        <ToolbarGroup lastChild style={{ width: 170 }}>
          {props.appSwitcher &&
            <AppSwitcher
              enabledAppsFailedLoading={props.enabledAppsFailedLoading}
              enabledApps={props.enabledApps}
              isFetchingApps={props.isFetchingApps}
              handleRefresh={props.handleRefresh}
            />}
          {props.profileMenu &&
            <ProfileMenu onLogout={props.logout} />}
          {props.closeButton &&
            <div
              style={{ marginLeft: 'auto' }}>
              <IconButton
                style={{ fontSize: 'inherit' }}>
                <CloseIcon color="white" />
              </IconButton>
            </div>}
        </ToolbarGroup>
      </Toolbar>
    </div>
  );
};

export default Header;
