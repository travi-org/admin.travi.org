import React from 'react';
import {assert} from 'chai';
import {shallow} from 'enzyme';
import ErrorPage from '../../../../../lib/shared/views/errors/page';

suite('error page', () => {
    test('that the error component is wrapped into a page', () => {
        const
            wrapper = shallow(<ErrorPage/>),
            wrapComponent = wrapper.find('Connect(Wrap)'),
            error = wrapComponent.find('ServerError');

        assert.equal(error.name(), 'ServerError');
    });

    test('that the 404 error component shown for a 404 statue', () => {
        const
            wrapper = shallow(<ErrorPage statusCode={404} />),
            wrapComponent = wrapper.find('Connect(Wrap)'),
            error = wrapComponent.find('NotFound');

        assert.equal(error.name(), 'NotFound');
    });
});
