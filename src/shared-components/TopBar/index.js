import React from 'react';
import { startsWith, find } from 'lodash';
import { Router, Route, Switch } from 'react-router'
import cx from 'classnames';

import { PropTypes } from 'helpers/react';


import styles from './styles/index.scss';
import AppNavigation from './AppNavigation';

const { element, bool, routerShape, arrayOf, shape, string } = PropTypes;
const appNavigationItems = [
  { title: 'Engines', link: '/engines' },
  { title: 'Applications', link: '/applications' },
  // { title: 'Sandbox Media', link: '/sandbox/media' },
  // { title: 'Sandbox Test Results', link: '/sandbox/test-results' },
  { title: 'API Reference', link: '/api-reference' },
  {
    title: 'Documentation',
    link: '//veritone-developer.atlassian.net/wiki/display/DOC/Developer+Documentation',
    external: true
  }
];

class TopBar extends React.Component {
  static propTypes = {
    appNavigation: bool,
    rightElement: element,
    leftElement: element,
    appBarOffset: bool,

    appNavigationItems: arrayOf(
      shape({
        title: string.isRequired,
        link: string.isRequired
      })
    ).isRequired,
    router: routerShape.isRequired
  };

  static defaultProps = {
    appNavigation: true,
    appNavigationItems: appNavigationItems
  };

  state = {
    open: false,
    anchorEl: null
  };

  handleOpenMenu = event => {
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false
    });
  };

  render() {
    const containerClasses = cx(styles['topBar'], {
      [styles['topBar--appBar-offset']]: this.props.appBarOffset
    });

    const rightGroupClasses = cx(styles['actions-container__item']);
    const leftGroupClasses = cx(styles['actions-container__item']);

    const activeNavItem = find(this.props.appNavigationItems, ({ link }) => {
      return startsWith(this.props.router.location.pathname, link);
    }) || {};

    return (
      <div className={containerClasses}>
        {this.props.appNavigation &&
          <AppNavigation
            navigationItems={appNavigationItems}
            activeNavigationItem={activeNavItem}
            open={this.state.open}
            onOpen={this.handleOpenMenu}
            onRequestClose={this.handleRequestClose}
            anchorEl={this.state.anchorEl}
          />}
        <div className={styles['actions-container']}>
          <div className={leftGroupClasses}>
            {this.props.leftElement}
          </div>

          <div className={rightGroupClasses}>
            {this.props.rightElement}
          </div>
        </div>
      </div>
    );
  }
}

export default TopBar;
