import {connect} from 'react-redux';
import {createUser} from '@travi/admin.travi.org-components';

export default (React) => connect((state) => {
    const user = state.get('resource').toJS();

    return {
        user: {
            id: user.id,
            displayName: user.displayName,
            name: user.name,
            links: user.links,
            avatar: user.thumbnail
        }
    };
})(createUser(React));
