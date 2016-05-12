import {connect} from 'react-redux';
import resource from '@travi/admin.travi.org-components/lib/resources/individual/resource';

export default (React) => connect((state) => {
    return {
        resource: state.get('resource').toJS()
    };
})(resource(React));
