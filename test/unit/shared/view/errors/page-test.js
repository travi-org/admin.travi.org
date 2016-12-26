import React from 'react';
import {assert} from 'chai';
import {shallow} from 'enzyme';
import {ServerError, NotFound} from '@travi/admin.travi.org-components';
import ErrorPage from '../../../../../lib/shared/views/errors/page';

suite('error page', () => {
  test('that the error component is wrapped into a page', () => {
    const wrapper = shallow(<ErrorPage />);
    const wrapComponent = wrapper.find('Connect(Wrap)');

    assert.isTrue(wrapComponent.contains(<ServerError />));
  });

  test('that the 404 error component shown for a 404 statue', () => {
    const wrapper = shallow(<ErrorPage statusCode={404} />);
    const wrapComponent = wrapper.find('Connect(Wrap)');

    assert.isTrue(wrapComponent.contains(<NotFound />));
  });
});
