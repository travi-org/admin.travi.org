import {createStore} from 'redux';
import {fromJS} from 'immutable';
import reducer from './reducer';
import {instrument} from '../views/dev/dev-tools.jsx';

module.exports = function (initialState) {
    return createStore(reducer, fromJS(initialState), instrument());
};
