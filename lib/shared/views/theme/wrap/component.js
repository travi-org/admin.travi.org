import {connect} from 'react-redux';
import {provideHooks} from 'redial';
import {Wrap} from '@travi/admin.travi.org-components';
import {loadNav} from './duck';

function fetch({dispatch, state}) {
    return dispatch(loadNav(state));
}

function mapStateToProps(state) {
    return {primaryNav: state.getIn(['wrap', 'nav']).toJS()};
}

export default connect(mapStateToProps)(provideHooks({fetch})(Wrap));
