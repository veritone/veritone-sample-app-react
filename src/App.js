import './polyfill';

import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bool, func } from 'prop-types';
import { AppFooter, AppContainer } from 'veritone-react-common';
import { modules } from 'veritone-redux-common';
import Divider from 'material-ui/Divider';

import AppBar from 'shared-components/AppBar';
import MediaExample from 'shared-components/MediaExample';
import styles from './App.scss';

class App extends React.Component {
  static propTypes = {
    userIsAuthenticated: bool,
    fetchUser: func.isRequired,
    fetchEnabledApps: func.isRequired
  };

  componentWillMount() {
    if (!this.props.userIsAuthenticated) {
      return this.props.fetchUser().then(this.props.fetchEnabledApps);
    }
  }

  render() {
    return (
      <Fragment>
        <AppBar />
        <AppContainer
          appBarOffset
          appFooterOffset="short"
          classes={{ inner: styles.container }}
        >
          <div className={styles.content}>
            <div>
              <h1>Sample Veritone Application</h1>
              <p>
                Welcome to the Veritone Sample Application. Head over to{' '}
                <a href="https://veritone-developer.atlassian.net/wiki/spaces/DOC/pages/17989665/Sample+App+Walkthrough">
                  our confluence page
                </a>{' '}
                to check out the sample app walkthrough guide. Below we have
                created a transcription example for you, in order to give you a
                small glimpse of what types of applications you can create while
                leveraging the Veritone Platform.
              </p>
            </div>

            <Divider />

            <MediaExample />
          </div>
        </AppContainer>
        <AppFooter>
          <span>&copy; Veritone, Inc. All Rights Reserved.</span>
          <a
            href="https://www.veritone.com/wp/terms/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms of Service
          </a>
          <a
            href="https://www.veritone.com/wp/privacy/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </a>
        </AppFooter>
      </Fragment>
    );
  }
}

export default connect(
  state => ({
    userIsAuthenticated: modules.user.userIsAuthenticated(state)
  }),
  {
    fetchUser: modules.user.fetchUser,
    fetchEnabledApps: modules.user.fetchEnabledApps
  }
)(App);
