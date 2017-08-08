import React from 'react';
import cx from 'classnames';
import { PropTypes } from 'helpers/react';
import ApplicationLogoImage from 'resources/veritone-logo-white.svg';

const { children, number, bool, string } = PropTypes;

const Logo = ({ className, link, ...props }) => (
  <div className="logo">
    <a href={link} target="_blank"><img src={ApplicationLogoImage} /></a>
  </div>
);

Logo.propTypes = {
  className: string,
  link: string
};

export { Logo };
