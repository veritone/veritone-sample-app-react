import React from 'react';
import { node, bool, oneOf, string } from 'prop-types';
import {
  appBarHeight,
  topBarHeight,
  appFooterHeightShort,
  appFooterHeightTall
} from 'veritone-react-common';

const AppContainer = ({
  topBarOffset,
  appBarOffset,
  appFooterOffset,
  children,
  className
}) => {
  const paddingBottom = {
    short: appFooterHeightShort,
    tall: appFooterHeightTall
  };
  let paddingTop = 'initial';
  if (topBarOffset && appBarOffset) {
    paddingTop = appBarHeight + topBarHeight;
  } else if (topBarOffset) {
    paddingTop = topBarHeight;
  } else if (appBarOffset) {
    paddingTop = appBarHeight;
  }

  return (
    <div
      style={{
        height: '100%',
        paddingTop: paddingTop,
        paddingBottom: paddingBottom[appFooterOffset],
        overflowX: 'hidden'
      }}
    >
      <div
        style={{
          height: '100%',
          width: '100%',
          overflowX: 'hidden',
          overflowY: 'scroll'
        }}
        className={className}
      >
        {children}
      </div>
    </div>
  );
};

AppContainer.propTypes = {
  children: node,
  topBarOffset: bool,
  appBarOffset: bool,
  appFooterOffset: oneOf(['short', 'tall']),
  className: string
};

export default AppContainer;
