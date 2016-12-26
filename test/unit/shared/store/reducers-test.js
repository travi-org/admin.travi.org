import * as redux from 'redux-immutable';
import sinon from 'sinon';
import {assert} from 'chai';
import any from '@travi/any';
import {getCombined} from '../../../../lib/shared/store/reducers';
import person from '../../../../lib/shared/views/persons/individual/duck';
import resource from '../../../../lib/shared/views/resources/individual/duck';
import resources from '../../../../lib/shared/views/resources/list/duck';
import wrap from '../../../../lib/shared/views/theme/wrap/duck';

suite('reducers', () => {
  let sandbox;

  setup(() => {
    sandbox = sinon.sandbox.create();
    sandbox.stub(redux, 'combineReducers');
  });

  teardown(() => {
    sandbox.restore();
  });

  test('that the reducers are combined', () => {
    const reducers = any.simpleObject();
    redux.combineReducers.withArgs({person, resource, resources, wrap}).returns(reducers);

    assert.equal(getCombined(), reducers);
  });
});
