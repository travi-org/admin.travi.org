import React from 'react';
import Root from '../../../../../lib/shared/views/root/root.dev';
import DevTools from '../../../../../lib/shared/views/dev/dev-tools';
import {assert} from 'chai';
import {shallow} from 'enzyme';
import any from '@travi/any';

suite('development root module', () => {
    test('that the app renders with dev-tools', () => {
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
        assert.isTrue(provider.contains(children));
        assert.isTrue(provider.contains(<DevTools />));
    });
});
