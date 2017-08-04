import React from 'react';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';

import { RedirectIfLoggedIn } from 'helpers/auth';
import * as userModule from 'modules/user';
import LoginForm from './LoginForm';

import { PropTypes } from 'helpers/react';
const { func } = PropTypes; // handles redirect logic after login success

class LoginPage extends React.Component {
  static propTypes = {
    login: func.isRequired
  };
  static defaultProps = {};

  handleLogin = v => {
    return this.props
      .login(v)
      .then(r => {
        if (r.error) {
          return Promise.reject(
            new SubmissionError({ _error: r.payload.message })
          );
        }

        return null;
      })
      .catch(e => {
        return Promise.reject(new SubmissionError({ _error: 'bad' }));
      });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="center">
              <h4>Developer Login</h4>
              <LoginForm onSubmit={this.handleLogin} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
