import {Map} from 'immutable';
import {setPrimaryNav} from './actions';

export default function reducer(state = Map(), action) {
    switch (action.type) {
    case 'SET_PRIMARY_NAV':
        return setPrimaryNav(state, action.nav);
    }

    return state;
}
