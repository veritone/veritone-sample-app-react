import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import { maybeProp } from 'helpers/react';

describe('react helpers', function() {
  describe('maybeProp', function() {
    it('returns an object with the given property if condition is true', function() {
      const result = maybeProp('icon', 'check', true);
      expect(result.icon).to.equal('check');
    });

    it('returns an object without the given property if condition is false', function() {
      const result = maybeProp('icon', 'check', false);
      expect(result.icon).not.to.exist;
    });

    it('works with a react component', function() {
      class MyComponent extends React.Component {
        render() {
          expect(this.props.hasOwnProperty('a')).to.be.false;
          return <div />;
        }
      }

      shallow(<MyComponent {...maybeProp('a', 'val', false)} />);
    });
  });
});
