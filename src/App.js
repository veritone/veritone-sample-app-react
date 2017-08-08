import React, { Component } from 'react';
import { CookiesProvider, withCookies, Cookies } from 'react-cookie';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { instanceOf } from 'prop-types';
import { Container, Row, Col } from 'shared-components/grid';
import Header from 'shared-components/Header';
import Footer from 'shared-components/Footer';

class App extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  componentWillMount() {
    // on mount
  }
  render() {
    //const { apiToken } = this.state;
    return (
      <MuiThemeProvider>
        <div className="wrapper">
          <Header appSwitcher profileMenu />
          <Container topBarOffset>
            <Row>
              <Col lg={12}>
                <h1>Sample Application</h1>
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

                <Row className="cta">
                  <Col sm={12} lg={10}>
                  1. Get your current logged in user data<br />
                    <small>https://api.aws-dev.veritone.com/v1/admin/current-user</small>
                  </Col>
                  <Col sm={12} lg={2}>
                    <button className="cta__button--blue"><span />Request</button>
                  </Col>
                </Row>

                <Row className="cta">
                  <Col sm={12} lg={10}>
                  2. Request Organization Data<br />
                    <small>https://api.aws-dev.veritone.com/v1/admin/current-org</small>
                  </Col>
                  <Col sm={12} lg={2}>
                    <button className="cta__button--blue"><span />Request</button>
                  </Col>
                </Row>

              </Col>
            </Row>
          </Container>
          <div id="loader"></div>
          <Footer />
        </div>
        </MuiThemeProvider>

    );
  }
}

export default withCookies(App);
