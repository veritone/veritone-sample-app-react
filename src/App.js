import React from 'react';
import './polyfill';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Container, Row, Col } from 'shared-components/grid';
import { AppBar, AppFooter } from 'veritone-react-common';
import MediaExample from 'shared-components/MediaExample';
import { modules } from 'veritone-redux-common';
import styles from './App.scss';


const { bool, array } = PropTypes;

class App extends React.Component {
  static propTypes = {
    userIsAuthenticated: bool,
    enabledApps: array
  };

  componentWillMount() {
    const { userIsAuthenticated, fetchUser, fetchEnabledApps } = this.props;

    if (!userIsAuthenticated) {
      fetchUser();
    }

    fetchEnabledApps();
  }

  render() {
    return (
      <div className={styles['wrapper']}>
        <AppBar
          profileMenu
          appSwitcher
          currentAppName="Sample App"
          logout={this.handleClick}
          user={{
            userName: 'mrobb@veritone.com',
            kvp: {
              firstName: 'Mitch',
              lastName: 'Robb',
              image: 'http://placekitten.com/g/400/300'
            }
          }}
          enabledApps={this.props.enabledApps}
        />
        <Container topBarOffset>
          <Row>
            <Col lg={12}>
              <h1>Sample Veritone Application</h1>
              <p>
                Welcome to the Veritone Sample Application.
                Head over to <a href='https://veritone-developer.atlassian.net/wiki/spaces/DOC/pages/17989665/Sample+App+Walkthrough'>
                  our confluence page
                </a> to check out the sample app walkthrough guide.
                Below we have created a transcription example for you, in order to give you a small glimpse of
                what types of applications you can create while leveraging the Veritone Platform.
              </p>
            </Col>
          </Row>
          <Row>
            <Col sm={12} className={styles['topDivider']}>
              <MediaExample />
            </Col>
          </Row>
        </Container>
        <div id="loader" />
        <AppFooter>
          <div className="content">
            <span>&copy; Veritone, Inc. All Rights Reserved.</span>
            <span><a href='https://www.veritone.com/wp/terms/' target='_blank' rel="noopener noreferrer">Terms of Service</a></span>
            <span><a href='https://www.veritone.com/wp/privacy/' target='_blank' rel="noopener noreferrer">Privacy Policy</a></span>
          </div>
        </AppFooter>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userIsAuthenticated: modules.user.userIsAuthenticated(state),
    // enabledApps: modules.user.selectEnabledApps(state)
  };
};

const mapDispatchToProps = { fetchUser: modules.user.fetchUser, fetchEnabledApps: modules.user.fetchEnabledApps };

export default connect(mapStateToProps, mapDispatchToProps)(App);
