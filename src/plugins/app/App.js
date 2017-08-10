import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Header from 'shared-components/Header';
import Footer from 'shared-components/Footer';
import styles from './styles/index.scss';

const { element, bool, shape, string, func } = PropTypes;

export default class App extends React.Component {
  static propTypes = {
    children: element.isRequired,
    userIsAuthenticated: bool
  };

  state = {
    currentChildren: this.props.children,
    pendingChildren: null
  };

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loading) {
      this.setState({
        currentChildren: nextProps.children || this.state.currentChildren,
        pendingChildren: null
      });
    }

    if (nextProps.children !== this.state.currentChildren) {
      if (nextProps.loading) {
        this.setState({
          pendingChildren: nextProps.children
        });
      } else {
        this.setState({
          currentChildren: nextProps.children,
          pendingChildren: null
        });
      }
    }
  }

  render() {
    return (
      <div className={styles['container']}>
        <Header />
          <div className={styles['content']}>
            {this.props.currentChildren}
          </div>
        <Footer />
      </div>
    );
  }
}
