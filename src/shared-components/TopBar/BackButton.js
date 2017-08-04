import React from 'react';
// import {} from 'lodash';
//import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';

import { PropTypes } from 'helpers/react';
const { func, string } = PropTypes;

import styles from './styles/backButton.scss';

const BackButton = ({ onClick, label }) => {
  return (
    <span onClick={onClick} className={styles['container']}>
      <ArrowBack />
      {label}
    </span>
  );
};

BackButton.propTypes = {
  onClick: func,
  label: string
};

export default BackButton;
