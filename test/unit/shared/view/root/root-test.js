import React from 'react';
import Root from '../../../../../lib/shared/views/root/root';
import {assert} from 'chai';
import {shallow} from 'enzyme';
import any from '@travi/any';

suite('production root module', () => {
    test('that the app renders without dev-tools', () => {
        const
            routes = <div/>,
            store = Object.assign({}, any.simpleObject(), {
                subscribe: () => undefined,
                dispatch: () => undefined,
                getState: () => undefined
            }),
            children = <div />,

            wrapper = shallow(
                <Root store={store} routes={routes} >
                    {children}
                </Root>
            ),
            provider = wrapper.find('Provider');

        assert.equal(provider.props().store, store);
        assert.isTrue(provider.find('MuiThemeProvider').contains(children));
    });
});
