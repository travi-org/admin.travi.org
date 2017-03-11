import {connect} from 'react-redux';
import {provideHooks} from 'redial';
import {Resource} from '@travi/admin.travi.org-components';
import {loadResource} from './duck';

function fetch({dispatch, params}) {
    return dispatch(loadResource(params.type, params.id));
}

function mapStateToProps(state) {
    return {
        resource: state.getIn(['resource', 'resource']).toJS(),
        loading: state.getIn(['resource', 'loading'])
    };
}

export default connect(mapStateToProps)(provideHooks({fetch})(Resource));
