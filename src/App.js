import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Container, Row, Col } from 'shared-components/grid';
import MediaExample from 'shared-components/MediaExample';
import Header from 'shared-components/Header';
import Footer from 'shared-components/Footer';
import styles from './App.scss';

import { userIsAuthenticated, fetchUser, fetchEnabledApps, getEnabledApps } from 'modules/user';

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
        <Header
          enabledApps={this.props.enabledApps}
          appSwitcher
          profileMenu
          onLogout={this.handleClick}
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
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userIsAuthenticated: userIsAuthenticated(state),
    enabledApps: getEnabledApps(state)
  };
};

const mapDispatchToProps = { fetchUser, fetchEnabledApps };

export default connect(mapStateToProps, mapDispatchToProps)(App);
