import {connect} from 'react-redux';
import {provideHooks} from 'redial';
import {MaybeList} from '@travi/admin.travi.org-components';
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

export default connect(mapStateToProps)(provideHooks({fetch})(MaybeList));
