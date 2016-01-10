import { jsdom } from 'jsdom';

global.document = jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = global.window.navigator;

function newFixture() {
  document.body.innerHTML = '';
  const root = document.createElement('div');
  document.body.appendChild(root);
  return root;
}

export default newFixture;
