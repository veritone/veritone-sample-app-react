import React from 'react';
import cx from 'classnames';
import { PropTypes } from 'helpers/react';
import { Logo } from 'shared-components/Branding';
const { string } = PropTypes;

const Header = (props = {}) => {
  const { className } = props;
  return (
    <div className={cx('header', className, {
      ['header--fixed']: true,
      ['header--centered']: true
    })}>
      <div className="content">
        <Logo link="https://www.veritone.com" />
        <div className="controls">
          <div className="controls__element">apps</div>
          <div className="controls__element">Applications</div>
          <div className="controls__element">Profile</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
