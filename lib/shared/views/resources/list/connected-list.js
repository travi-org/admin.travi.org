import {connect} from 'react-redux';
import {createMaybeList} from '@travi/admin.travi.org-components';

export default (React) => connect((state) => {
    const resourceType = state.get('resourceType');

    return {
        resources: state.get(resourceType).toJS(),
        resourceType
    };
})(createMaybeList(React));
