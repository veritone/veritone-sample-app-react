import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import { Container, Row, Col } from 'shared-components/grid';
import RequestBar from 'shared-components/RequestBar';
import Header from 'shared-components/Header';
import Footer from 'shared-components/Footer';
import styles from './App.scss';

import { userIsAuthenticated, fetchUser, fetchApplications } from 'modules/user';
import Demo from 'modules/demo';

const { element, bool, shape, string, func } = PropTypes;

class App extends React.Component {
  static propTypes = {
    userIsAuthenticated: bool
  };

  componentWillMount() {
    const { userIsAuthenticated, fetchUser } = this.props;

    if (!userIsAuthenticated) {
      //this.props.fetchUser();
    }
  }

  DemoRequestHandler = (e) => {
    e.preventDefault();
    console.log(e, fetchApplications);
    // nothing
  }

  render() {

    return (
      <div className={styles['wrapper']}>
        <Header enabledApps={Demo.apps} appSwitcher profileMenu onLogout={this.handleClick} />
        <Container topBarOffset>
          <Row>
            <Col lg={12}>
              <h1>Sample Veritone Application</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer id
                commodo augue. Praesent quam nisi, dictum ac neque quis, ultricies vulputate
                magna. Mauris mollis, est et ultricies ultrices, odio est ultrices neque, in
                sagittis dui nibh at nisl. Vivamus pretium fermentum nunc, at congue nulla
                scelerisque in.
              </p>
              <p>
                Donec a diam lacinia odio congue tempor. Praesent volutpat
                diam vitae arcu fermentum, ac euismod mauris commodo. Sed interdum magna non
                arcu vehicula consectetur. Suspendisse ac turpis egestas, varius tellus a,
                faucibus sapien. Quisque in turpis at augue facilisis ultrices. Nulla facilisi.
                Suspendisse rutrum sed tellus vitae cursus. Nunc tincidunt ante vitae nibh
                aliquam hendrerit. Nulla cursus est libero, vestibulum rutrum nulla gravida non.
                Nam sapien lectus, tempus et sollicitudin eu, mattis sit amet leo.
                Aliquam vel iaculis felis.
              </p>
            </Col>
          </Row>

          <Row>
            <Col sm={12} className="topDivider">
              <h4>Example API Requests</h4>
              <p>
                Below are a few example API requests which can be made after proper authentication/authorization.
                Please refer to the API documentation if you are unsure of any functionality.
              </p>
              {
                Demo.requests.map((request, index) => <RequestBar key={index} id={index + 1} onclick={this.DemoRequestHandler} {...request} />)
              }
            </Col>
          </Row>
        </Container>
        <div id="loader"></div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userIsAuthenticated: userIsAuthenticated(state)
  }
}

const mapDispatchToProps = { fetchUser }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
