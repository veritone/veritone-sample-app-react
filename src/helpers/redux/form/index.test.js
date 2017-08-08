import { expect } from 'chai';

import { requireFields } from './';

describe('redux-form helpers', function() {
  describe('requireFields', function() {
    it('Returns an object of missing field => error message', function() {
      const requiredFields = ['a', 'c'];

      const result = requireFields(requiredFields)({
        a: 'ok',
        b: 'ok',
        c: undefined,
        d: null
      });

      expect(result).to.have.property('c');
      expect(result).to.not.have.any.keys('a', 'b', 'd');
    });

    it('Uses the correct error message if provided', function() {
      const requiredFields = ['a', 'c'];

      const result = requireFields(requiredFields, { message: 'works' })({
        a: undefined
      });

      expect(result).to.have.property('a').and.equal('works');
    });
  });
});
