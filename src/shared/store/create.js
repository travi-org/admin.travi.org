import {createStore} from 'redux';
import {fromJS} from 'immutable';
import {getCombined} from './reducers';
import {getComposed} from './middlewares';

export function configureStore({initialState, session}) {
  return createStore(getCombined(), fromJS(initialState), getComposed(session));
}
