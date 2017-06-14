import React, { Component } from 'react';

export default class NoAccess extends Component {
  render() {
    return (
      <div className="container text-center">
        <h4>
          {"Sorry, your account doesn't have access to the Developer app."}
        </h4>
        <hr />
        <a href="https://www.veritone.com/onboarding/#/?type=developer">
          Create a developer user
        </a>
      </div>
    );
  }
}
