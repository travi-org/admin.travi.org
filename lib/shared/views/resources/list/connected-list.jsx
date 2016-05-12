import {connect} from 'react-redux';
import maybeResourceList from '@travi/admin.travi.org-components/lib/resources/list/maybe-list';

export default (React) => connect((state) => {
    const resourceType = state.get('resourceType');

    return {
        resources: state.get(resourceType).toJS(),
        resourceType
    };
})(maybeResourceList(React));
