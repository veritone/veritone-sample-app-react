import React from 'react';
import { PropTypes } from 'prop-types';
import ApplicationLogoImage from 'resources/veritone-logo-white.svg';

const { string } = PropTypes;

// fixme -- shouldn't this be part of AppBar?


const Logo = ({ className, link, ...props }) => (
  <div className="logo">
    <a href={link} target="_blank" rel="noopener noreferrer"><img alt="Veritone Application" src={ApplicationLogoImage} /></a>
  </div>
);

Logo.propTypes = {
  className: string,
  link: string
};

export { Logo };
