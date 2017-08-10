import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Container, Row, Col } from 'shared-components/grid';
import { Request } from 'shared-components/Veritone';
import Header from 'shared-components/Header';
import Footer from 'shared-components/Footer';

import { User } from 'modules/user';
import { Application } from 'modules/application';

class App extends Component {

  static propTypes = {
  };

  state = {
    apps: [
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
    ],
    requests: [
      {
        index: '1',
        description: 'Get your current logged in user data',
        endpoint: 'https://api.aws-dev.veritone.com/v1/admin/current-user',
        parameters: User.requestParameters,
        fields: User.responseParameters.fields,
        handleClick: () => this.handleClick(0)
      },
      {
        index: '2',
        description: 'Get available Veritone applications',
        endpoint: 'https://api.aws-dev.veritone.com/v1/admin/current-user/applications',
        parameters: User.requestParameters,
        fields: Application.responseParameters.fields,
        handleClick: () => this.handleClick(1)
      }
    ]
  };



  componentWillMount() {
    // todo: update
  };

  handleClick = (requestIndex) => {
    console.info(this.state.requests[requestIndex]);
  };

  render() {
    injectTapEventPlugin();
    return (
      <MuiThemeProvider>
        <div className="wrapper">
          <Header enabledApps={this.state.apps} appSwitcher profileMenu onLogout={this.handleClick} />
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
                <Request {...this.state.requests[0]} />
                <Request {...this.state.requests[1]} />
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

//<Request {...this.state.requests[1]} />

export default App;
