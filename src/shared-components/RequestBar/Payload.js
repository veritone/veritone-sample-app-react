import React from 'react';
import { node } from 'prop-types';

import styles from './styles';

const RequestBarPayload = ({ children }) => {
  return <div className={styles.requestBar__payload}>{children}</div>;
};

RequestBarPayload.propTypes = {
  children: node.isRequired
};

export default RequestBarPayload;
