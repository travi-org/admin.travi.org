import React from 'react';
import {createStore} from 'redux';
import {assert} from 'chai';
import {shallow} from 'enzyme';
import any from '@travi/any';
import Root from '../../../../../src/shared/views/root/root';

suite('production root module', () => {
  const children = <div id="foo">bar</div>;
  const store = createStore(() => any.simpleObject());

  test('that children are wrapped with the mui-theme', () => {
    const userAgent = any.string();

    const wrapper = shallow(<Root store={store} request={{headers: {'user-agent': userAgent}}}>{children}</Root>);
    const reduxProvider = wrapper.find('Provider');
    const themeProvider = reduxProvider.find('MuiThemeProvider');

    assert.equal(reduxProvider.props().store, store);
    assert.containSubset(themeProvider.prop('muiTheme'), {userAgent});
    assert.isTrue(themeProvider.contains(children));
  });

  test('that the user-agent is not overridden if request details are not available', () => {
    const wrapper = shallow(<Root store={store}>{children}</Root>);
    const themeProvider = wrapper.find('MuiThemeProvider');

    assert.isUndefined(themeProvider.prop('muiTheme').userAgent);
  });
});
