import React from 'react';
import { PropTypes } from 'helpers/react';
import ApplicationLogoImage from 'resources/veritone-logo-white.svg';

const { string } = PropTypes;

const Logo = ({ className, link, ...props }) => (
  <div className="logo">
    <a href={link} target="_blank" rel="noopener noreferrer"><img src={ApplicationLogoImage} /></a>
  </div>
);

Logo.propTypes = {
  className: string,
  link: string
};

export { Logo };
