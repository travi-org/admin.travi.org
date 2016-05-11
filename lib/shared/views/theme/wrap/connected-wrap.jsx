import {connect} from 'react-redux';
import wrap from '@travi/admin.travi.org-components/lib/theme/wrap/wrap';

export default (React) => connect((state) => {
    return {
        primaryNav: state.get('primaryNav').toJS()
    };
})(wrap(React));
