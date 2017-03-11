import * as redux from 'redux-immutable';
import sinon from 'sinon';
import {assert} from 'chai';
import any from '@travi/any';
import {getCombined} from '../../../../src/shared/store/reducers';
import person from '../../../../src/shared/views/persons/individual/duck';
import resource from '../../../../src/shared/views/resources/individual/duck';
import resources from '../../../../src/shared/views/resources/list/duck';
import wrap from '../../../../src/shared/views/theme/wrap/duck';

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
