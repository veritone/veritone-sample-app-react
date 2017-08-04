import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Popover from 'material-ui/Popover';
import DownArrow from 'material-ui/svg-icons/navigation/arrow-drop-down';
import { darkBlack } from 'material-ui/styles/colors';
import { Route } from 'react-router';

import { PropTypes } from 'helpers/react';


import styles from './styles/index.scss';
const { shape, string, arrayOf, func, bool, object } = PropTypes;
const navItemShape = shape({
  title: string.isRequired,
  link: string.isRequired,
  external: bool
});
export default class AppNavigation extends React.Component {
  static propTypes = {
    navigationItems: arrayOf(navItemShape).isRequired,
    activeNavigationItem: navItemShape,
    onOpen: func,
    onRequestClose: func,
    open: bool,
    anchorEl: object // eslint-disable-line
  };
  static defaultProps = {};

  render() {
    return (
      <div className={styles['appNavigation-container']}>
        <span className={styles['button--desktop']}>
          <FlatButton
            className={styles['appNavigation-container__button']}
            onTouchTap={this.props.onOpen}
          >
            <div className={styles['appNavigation-container__button-label']}>
              <span className={styles['label--mobile']}>
                {this.props.activeNavigationItem.title}
              </span>

              <span className={styles['label--desktop']}>
                Nav
              </span>
              <DownArrow />
            </div>
          </FlatButton>
        </span>

        <Popover
          open={this.props.open}
          anchorEl={this.props.anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.props.onRequestClose}
        >
          <Menu
            className={styles['appNavigation-popover-menu']}
            autoWidth={false}
            value={this.props.activeNavigationItem.link}
            // fixme -- Link wrapper around MenuItemprevents active item
            // from being styled. await material ui update?
            selectedMenuItemStyle={{
              backgroundColor: '#eee',
              color: darkBlack
            }}
          >
            {this.props.navigationItems.map(({ title, link, external }) => {
              return (
                <Route to={link} />
              );
            })}
          </Menu>
        </Popover>
      </div>
    );
  }
}
