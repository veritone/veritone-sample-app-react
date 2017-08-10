import React from 'react';
// import { omit } from 'lodash';
// import RaisedButton from 'material-ui/RaisedButton';
// import LinearProgress from 'material-ui/LinearProgress';
import { PropTypes } from 'helpers/react';
// import styles from './styles/index';
const { bool } = PropTypes;

const ProgressButton = (props = {}) => {
  //const { loading } = props;
  return (
    <button>
      { this.props.value }
    </button>
  );
};

ProgressButton.propTypes = {
  loading: bool
};

export default ProgressButton;
