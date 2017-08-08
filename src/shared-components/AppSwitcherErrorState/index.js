import React from 'react';
import { PropTypes } from 'helpers/react';
import RaisedButton from 'material-ui/RaisedButton';
import styles from './styles/index.scss';

const { func } = PropTypes;

export default class AppSwitcherErrorState extends React.Component {
  static propTypes = {
    handleRefresh: func
  };
  static defaultProps = {};

  render() {
    return (
      <div className={styles.appListButtonErrorState}>
        An error occurred loading this content
        <RaisedButton label="retry" onClick={this.props.handleRefresh} />
      </div>
    );
  }
}
