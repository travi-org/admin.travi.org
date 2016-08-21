import React from 'react';
import {assert} from 'chai';
import {shallow} from 'enzyme';
import ErrorPage from '../../../../../lib/shared/views/errors/page';
import {createServerError} from '@travi/admin.travi.org-components';

const ServerError = createServerError(React);

suite('error page', () => {
    test('that the error component is wrapped into a page', () => {
        const
            wrapper = shallow(<ErrorPage/>),
            wrapComponent = wrapper.find('Connect(Wrap)'),
            error = wrapComponent.find('ServerError');

        assert.equal(error.name(), 'ServerError');
    });
});
