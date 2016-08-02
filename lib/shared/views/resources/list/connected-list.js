import {connect} from 'react-redux';
import {provideHooks} from 'redial';
import {createMaybeList} from '@travi/admin.travi.org-components';
import {loadResources} from './duck';

function fetch({dispatch, params}) {
    return dispatch(loadResources(params.type));
}

function mapStateToProps(state) {
    return {
        resources: state.getIn(['resources', 'list']).toJS(),
        resourceType: state.getIn(['resources', 'type']),
        loading: state.getIn(['resources', 'loading'])
    };
}

export default (React) => connect(mapStateToProps)(provideHooks({fetch})(createMaybeList(React)));
