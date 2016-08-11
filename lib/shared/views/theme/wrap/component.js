import {connect} from 'react-redux';
import {provideHooks} from 'redial';
import {createWrap} from '@travi/admin.travi.org-components';
import {loadNav} from './duck';

function fetch({dispatch, params}) {
    return dispatch(loadNav(params.id));
}

function mapStateToProps(state) {
    return {
        primaryNav: state.getIn(['wrap', 'nav']).toJS()
    };
}

export default (React) => connect(mapStateToProps)(provideHooks({fetch})(createWrap(React)));
