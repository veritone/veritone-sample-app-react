import React from 'react';
import { flow } from 'lodash';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as user from 'modules/user';
import { TextField, requireFields } from 'helpers/redux/form';
import { PropTypes } from 'helpers/react';
import ProgressButton from 'shared-components/ProgressButton';
const { func, bool, string } = PropTypes;

const requiredFields = ['userName', 'password'];

const decorators = flow([
  reduxForm({
    form: 'login',
    validate: requireFields(requiredFields)
  }),
  connect(state => ({
    submitting: user.isLoggingIn(state),
    submitFailed: user.loginFailed(state),
    loginFailureMessage: user.loginFailureMessage(state)
  }))
]);
class LoginForm extends React.Component {
  static propTypes = {
    submitting: bool,
    submitFailed: bool,
    valid: bool,
    handleSubmit: func.isRequired,
    loginFailureMessage: string
  };
  static defaultProps = {};

  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <Field
          label="User name"
          name="userName"
          type="text"
          component={TextField}
        />

        <Field
          label="Password"
          name="password"
          type="password"
          component={TextField}
        />

        {this.props.submitFailed &&
          <p>
            {this.props.loginFailureMessage}
          </p>}

        <ProgressButton
          type="submit"
          label="Log in"
          loading={this.props.submitting}
          disabled={
            // fixme -- should be enabled when submitFailed
            // (valid == false)
            this.props.submitting
          }
          primary
          style={{
            marginTop: 20
          }}
        />
      </form>
    );
  }
}

export default decorators(LoginForm);
