import React from 'react';
import { isFunction } from 'lodash';

// import { PropTypes } from 'helpers/react';
// const {  } = PropTypes;

const lazyLoaded = importFn => {
  // if (process.env.NODE_ENV === 'development') {
  //   importFn();
  // }

  class LazyLoadedComponent extends React.PureComponent {
    state = {
      component: null
    };

    componentWillMount() {
      if (!isFunction(importFn)) {
        return console.warn(
          'lazyLoaded: importFn was not a function, got:',
          importFn,
          "correct use is: `lazyLoaded(() => import('./App'))`"
        );
      }

      this.load();
    }

    componentWillUpdate() {
      if (process.env.NODE_ENV === 'development') {
        this.load();
      }
    }

    load() {
      return importFn().then(mod => {
        this.setState({
          // handle both es imports and cjs
          component: mod.default ? mod.default : mod
        });
      });
    }

    render() {
      return this.state.component
        ? <this.state.component {...this.props} />
        : <div>loading</div>;
    }
  }

  return LazyLoadedComponent;
};

export default lazyLoaded;
