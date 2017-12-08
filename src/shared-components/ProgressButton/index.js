import React from 'react';
// import { omit } from 'lodash';
// import RaisedButton from 'material-ui/RaisedButton';
// import LinearProgress from 'material-ui/LinearProgress';
import { bool } from 'prop-types';
// import styles from './styles/index';

const ProgressButton = (props = {}) => {
  //const { loading } = props;
  return <button>{this.props.value}</button>;
};

ProgressButton.propTypes = {
  loading: bool
};

export default ProgressButton;
