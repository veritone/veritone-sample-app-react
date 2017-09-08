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

  DemoRequestHandler = (e) => {
    e.preventDefault();
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                id commodo augue. Praesent quam nisi, dictum ac neque quis,
                ultricies vulputate magna. Mauris mollis, est et ultricies
                ultrices, odio est ultrices neque, in sagittis dui nibh at nisl.
                Vivamus pretium fermentum nunc, at congue nulla scelerisque in.
              </p>
              <p>
                Donec a diam lacinia odio congue tempor. Praesent volutpat diam
                vitae arcu fermentum, ac euismod mauris commodo. Sed interdum
                magna non arcu vehicula consectetur. Suspendisse ac turpis
                egestas, varius tellus a, faucibus sapien. Quisque in turpis at
                augue facilisis ultrices. Nulla facilisi. Suspendisse rutrum sed
                tellus vitae cursus. Nunc tincidunt ante vitae nibh aliquam
                hendrerit. Nulla cursus est libero, vestibulum rutrum nulla
                gravida non. Nam sapien lectus, tempus et sollicitudin eu,
                mattis sit amet leo. Aliquam vel iaculis felis.
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
