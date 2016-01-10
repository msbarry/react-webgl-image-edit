
import { render } from 'react-dom';
import React from 'react';

import App from '~/src/containers/App';
import domFixture from '~/src/dom-test-fixture';
import assert from 'assert';
import { Simulate } from 'react-addons-test-utils';

describe('app', () => {
  it('should increment and decrement', () => {
    render(
      <App/>,
      domFixture()
    );
    assert.equal(document.getElementById('cntr').textContent, '0');
    Simulate.click(document.getElementById('incr'));
    assert.equal(document.getElementById('cntr').textContent, '1');
    Simulate.click(document.getElementById('decr'));
    assert.equal(document.getElementById('cntr').textContent, '0');
  });
});
