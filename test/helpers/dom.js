import {JSDOM} from 'jsdom';

function setupDom() {
  const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
  const {window} = jsdom;
  global.window = window;
  global.document = window.document;
  window.fetch = () => undefined;

  function copyProps(src, target) {
    const props = Object.getOwnPropertyNames(src)
      .filter(prop => 'undefined' === typeof target[prop])
      .map(prop => Object.getOwnPropertyDescriptor(src, prop));
    Object.defineProperties(target, props);
  }

  copyProps(window, global);

  global.navigator = {
    userAgent: 'node.js'
  };

  global.requestAnimationFrame = callback => setTimeout(callback, 0);

  return jsdom;
}

const dom = setupDom();

export default dom;
