import {connect} from 'react-redux';
import {createUser} from '@travi/admin.travi.org-components';

export default (React) => connect((state) => {
    const person = state.get('resource').toJS();

    return {
        user: {
            id: person.id,
            displayName: person.displayName,
            name: person.name,
            links: person.links,
            avatar: person.thumbnail
        }
    };
})(createUser(React));
