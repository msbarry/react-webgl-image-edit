import assert from 'assert';
import React from 'react';
import ReactDOM from 'react-dom';

import domFixture from '~/src/dom-test-fixture';

import Header from '.';

describe('header', () => {
  it('should', () => {
    ReactDOM.render(
      <Header/>,
      domFixture()
    );
    assert.equal(document.getElementsByTagName('h1')[0].textContent, 'Hello World!');
  });
});
