import React from 'react';
import { PropTypes } from 'helpers/react';
const { bool } = PropTypes;

const Footer = (props = {}) => {
  const { loading } = props;

  return (
    <div className="footer">
      <div className="content">
        <span>&copy; Veritone, Inc. All Rights Reserved.</span>
        <span><a href="#">Terms of Service</a></span>
        <span><a href="#">Privacy Policy</a></span>
      </div>
    </div>
  );
};

export default Footer;
