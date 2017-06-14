import React, { Component } from 'react';
import { Link } from 'react-router';

export default class NotFound extends Component {
  render() {
    return (
      <div className="container text-center">
        <h4>{"Sorry, this page doesn't exist!"}</h4>
        <hr />
        <Link to="/">Go back home</Link>
      </div>
    );
  }
}
