import {createStore} from 'redux';
import {fromJS} from 'immutable';
import reducer from './reducer';
import DevTools from '../views/dev/dev-tools';

module.exports = function (initialState) {
    return createStore(reducer, fromJS(initialState), DevTools.instrument());
};
