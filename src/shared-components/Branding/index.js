import React from 'react';
import cx from 'classnames';
import { PropTypes } from 'helpers/react';
// import ApplicationLogoImage from 'public/veritone-logo-white.svg';

const ApplicationLogoImage = 'fixme';

const { children, number, bool, string } = PropTypes;

// fixme -- shouldn't this be part of AppBar?


const Logo = ({ className, link, ...props }) => (
  <div className="logo">
    <a href={link} target="_blank"><img src={ApplicationLogoImage} />FIXME LOGO</a>
  </div>
);

Logo.propTypes = {
  className: string,
  link: string
};

export { Logo };
