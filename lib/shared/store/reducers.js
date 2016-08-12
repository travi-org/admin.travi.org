import {combineReducers} from 'redux-immutable';
import person from '../views/persons/individual/duck';
import resource from '../views/resources/individual/duck';
import resources from '../views/resources/list/duck';
import wrap from '../views/theme/wrap/duck';

export function getCombined() {
    return combineReducers({person, resource, resources, wrap});
}
