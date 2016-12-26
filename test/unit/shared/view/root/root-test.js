import React from 'react';
import {assert} from 'chai';
import {shallow} from 'enzyme';
import any from '@travi/any';
import Root from '../../../../../lib/shared/views/root/root';

suite('production root module', () => {
  test('that the app renders without dev-tools', () => {
    const routes = <div />;
    const store = Object.assign({}, any.simpleObject(), {
      subscribe: () => undefined,
      dispatch: () => undefined,
      getState: () => undefined
    });
    const children = <div />;

    const wrapper = shallow(
      <Root store={store} routes={routes}>
        {children}
      </Root>
    );
    const provider = wrapper.find('Provider');

    assert.equal(provider.props().store, store);
    assert.isTrue(provider.find('MuiThemeProvider').contains(children));
  });
});
