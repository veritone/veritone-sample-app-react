import React from 'react';
import cx from 'classnames';
import { PropTypes } from 'helpers/react';

import '../../styles/vendor/grid.css';

const { children, number, bool, string } = PropTypes;
const Container = ({ children, className, topBarOffset, ...props }) => (
  <div
    {...props}
    className={cx('container', className, {
      ['topBarOffset']: topBarOffset
    })}
  >
    {children}
  </div>
);

Container.propTypes = {
  children,
  className: string,
  topBarOffset: bool,
  sideBarOffset: bool
};

const Row = ({ children, className, ...props }) => (
  <div className={cx('row', className)} {...props}>
    {children}
  </div>
);

Row.propTypes = {
  children,
  className: string
};

const Col = ({ children, lg, sm, hiddenSm, className, ...props }) => {
  const colClass = `col-${lg}`;
  const colSmClass = `col-${sm}-sm`;
  const hiddenSmClass = 'hidden-sm';

  const classes = cx(
    lg && colClass,
    sm && colSmClass,
    hiddenSm && hiddenSmClass,
    className
  );

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

Col.propTypes = {
  children,
  lg: number,
  sm: number,
  hiddenSm: bool,
  className: string
};

export { Container, Row, Col };