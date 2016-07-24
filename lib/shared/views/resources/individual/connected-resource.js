import {connect} from 'react-redux';
import {createResource} from '@travi/admin.travi.org-components';

export default (React) => connect((state) => ({
    resource: state.getIn(['legacy', 'resource']).toJS()
}))(createResource(React));
