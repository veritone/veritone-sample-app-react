import React from 'react';
import { PropTypes } from 'helpers/react';
import styles from './styles/index.scss';
import TopBar from 'shared-components/TopBar';
const { bool } = PropTypes;

const Header = (props = {}) => {
  const { loading } = props;

  return (
    <TopBar />
  );
};

export default Header;
