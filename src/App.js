import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Container, Row, Col } from 'shared-components/grid';
import RequestBar from 'shared-components/RequestBar';
import MediaExample from 'shared-components/MediaExample';
import Header from 'shared-components/Header';
import Footer from 'shared-components/Footer';
import styles from './App.scss';

import { userIsAuthenticated, fetchUser } from 'modules/user';

const { bool } = PropTypes;

class App extends React.Component {
  static propTypes = {
    userIsAuthenticated: bool
  };

  componentWillMount() {
    const { userIsAuthenticated, fetchUser } = this.props;

    if (!userIsAuthenticated) {
      // this.props.fetchUser();
    }
  }

  render() {
    const exampleBtn = (
      <button
        className="requestBar__btn"
        onClick={function() {
          console.log('AJAX()');
        }}
      >
        Request
      </button>
    );
    const apps = [
      {
        applicationId: 'abcd',
        applicationName: 'Test Application',
        applicationIconSvg: '',
        applicationIconUrl: 'https://www.veritone.com'
      },
      {
        applicationId: '1234',
        applicationName: 'Beta Application',
        applicationIconSvg: '',
        applicationIconUrl: 'https://www.veritone.com'
      }
    ];
    const requests = [
      {
        description: 'Get your current logged in user data',
        endpoint: 'https://api.aws-dev.veritone.com/v1/admin/current-user',
        parameters: {},
        fields: [],
        button: exampleBtn
      },
      {
        description: 'Get available Veritone applications',
        endpoint:
          'https://api.aws-dev.veritone.com/v1/admin/current-user/applications',
        parameters: {},
        fields: [],
        button: exampleBtn
      }
    ];

    return (
      <div className={styles['wrapper']}>
        <Header
          enabledApps={apps}
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
              <h4>Example API Requests</h4>
              <p>
                Below are a few example API requests which can be made after
                proper authentication/authorization. Please refer to the API
                documentation if you are unsure of any functionality.
              </p>
              {requests.map((request, index) =>
                <RequestBar key={index} id={index + 1} {...request} />
              )}
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
    userIsAuthenticated: userIsAuthenticated(state)
  };
};

const mapDispatchToProps = { fetchUser };

export default connect(mapStateToProps, mapDispatchToProps)(App);
