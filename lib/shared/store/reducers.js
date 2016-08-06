import {combineReducers} from 'redux-immutable';
import legacy from './reducer';
import person from '../views/persons/individual/duck';
import resource from '../views/resources/individual/duck';
import resources from '../views/resources/list/duck';

export function getCombined() {
    return combineReducers({legacy, person, resource, resources});
}
