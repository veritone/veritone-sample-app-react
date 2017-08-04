import React from 'react';
import { noop } from 'lodash';
import { expect } from 'chai';

import { mountWithMuiContext } from 'helpers/test/mui';
import TopBar from './index';

const commonProps = {
  router: {
    location: { pathname: '' },
    push: noop
  }
};

describe('TopBar', function() {
  it('renders left element', function() {
    const wrapper = mountWithMuiContext(
      <TopBar leftElement={<div id="left" />} {...commonProps} />
    );

    expect(wrapper).to.have.descendants('#left');
  });

  it('renders right item', function() {
    const wrapper = mountWithMuiContext(
      <TopBar rightElement={<div id="right" />} {...commonProps} />
    );

    expect(wrapper).to.have.descendants('#right');
  });

  it('renders left + right items', function() {
    const wrapper = mountWithMuiContext(
      <TopBar
        rightElement={<div id="right" />}
        leftElement={<div id="left" />}
        {...commonProps}
      />
    );

    expect(wrapper).to.have.descendants('#right');
    expect(wrapper).to.have.descendants('#left');
  });

  it('shows the title corresponding to the current route on appNavigation', function() {
    const wrapper = mountWithMuiContext(
      <TopBar
        appNavigation
        router={{
          push: noop,
          location: { pathname: '/it/works/yay' }
        }}
        appNavigationItems={[{ title: 'ok', link: '/it/works' }]}
      />
    );

    expect(wrapper).text().match(/ok/);
  });
});
