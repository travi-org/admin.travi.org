import {createStore} from 'redux';
import {getCombined} from './reducers';
import {getComposed} from './middlewares';
import {fromJS} from 'immutable';

export function configureStore({initialState, session}) {
    return createStore(getCombined(), fromJS(initialState), getComposed(session));
}
