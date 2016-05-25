import {connect} from 'react-redux';
import {createResource} from '@travi/admin.travi.org-components';

export default (React) => connect((state) => {
    return {
        resource: state.get('resource').toJS()
    };
})(createResource(React));
