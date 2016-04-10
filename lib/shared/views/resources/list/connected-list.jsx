import {connect} from 'react-redux';
import maybeResourceList from './maybe-list.jsx';

export default (React) => connect((state) => {
    const resourceType = state.get('resourceType');

    return {
        resources: state.get(resourceType).toJS(),
        resourceType
    };
})(maybeResourceList(React));
