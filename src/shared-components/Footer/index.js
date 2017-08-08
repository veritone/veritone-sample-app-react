import React from 'react';
import { PropTypes } from 'helpers/react';
const { bool } = PropTypes;

const Footer = (props = {}) => {
  const { loading } = props;

  return (
    <div className="footer">
      <div className="content">
        2017 | Sample React Application <a href="https://www.veritone.com">Veritone</a>
      </div>
    </div>
  );
};

export default Footer;
