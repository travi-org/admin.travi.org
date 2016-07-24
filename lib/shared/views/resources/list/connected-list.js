import {connect} from 'react-redux';
import {createMaybeList} from '@travi/admin.travi.org-components';

export default (React) => connect((state) => {
    const resourceType = state.getIn(['legacy', 'resourceType']);

    return {
        resources: state.getIn(['legacy', resourceType]).toJS(),
        resourceType
    };
})(createMaybeList(React));
