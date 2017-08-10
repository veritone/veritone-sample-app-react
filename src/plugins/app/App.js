import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
// import Header from 'shared-components/Header';
import Footer from 'shared-components/Footer';
import styles from './styles/index.scss';

import { userIsAuthenticated, fetchUser } from 'modules/user';

const { element, bool, shape, string, func } = PropTypes;


class App extends React.Component {
  static propTypes = {
    userIsAuthenticated: bool
  };

	componentWillMount() {
		const { userIsAuthenticated, fetchUser } = this.props;

		if (!userIsAuthenticated) {
			this.props.fetchUser();
		}
	}

  render() {
    return (
      <div className={styles['container']}>
        {/* <Header /> */}
          <div className={styles['content']}>
            <h1>Hello World</h1>
          </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userIsAuthenticated: userIsAuthenticated(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: () => dispatch(fetchUser())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
