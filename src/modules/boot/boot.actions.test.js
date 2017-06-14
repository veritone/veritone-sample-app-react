import { expect } from 'chai';
import { noop } from 'lodash';
import nock from 'nock';
import { makeMockStore } from 'helpers/test/redux';
const mockStore = makeMockStore();

import * as bootModule from './';
import * as configModule from 'modules/config';

describe('boot module actions', function() {
  afterEach(function() {
    nock.cleanAll();
    window.config = undefined;
  });

  let originalConsoleWarn;
  before(function() {
    console.warn = noop;
  });

  after(function() {
    console.warn = originalConsoleWarn;
  });

  it('exists', function() {
    expect(bootModule.boot).to.be.a('function');
  });

  it('dispatches boot_start', function() {
    const store = mockStore();

    store.dispatch(bootModule.boot());

    expect(store.getActions()).to.contain({ type: bootModule.BOOT_START });
  });

  it('sets the app config from the config global', function() {
    const store = mockStore();

    window.config = { test: 123 };
    store.dispatch(bootModule.boot());

    expect(store.getActions()).to.contain({
      type: configModule.SET_CONFIG,
      payload: window.config
    });
  });

  it('dispatches boot_end on success', function() {
    const store = mockStore({
      config: {
        apiRoot: 'http://www.test.com'
      }
    });

    nock('http://www.test.com').get(/user/).reply(200, { userName: 'mitch' });

    store.dispatch(bootModule.boot());

    expect(store.getActions()).to.contain({
      type: bootModule.BOOT_END
    });
  });

  xit('dispatches boot_failure on failure', function() {
    const store = mockStore({
      config: {
        apiRoot: 'http://www.test.com'
      }
    });

    // todo: find an error to test for
    store.dispatch(bootModule.boot());

    const hasFailureAction = store
      .getActions()
      .some(a => a.type === bootModule.BOOT_FAILURE);

    return expect(hasFailureAction).to.be.true;
  });
});
