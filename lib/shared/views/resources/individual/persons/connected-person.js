import {connect} from 'react-redux';
import {createPerson} from '@travi/admin.travi.org-components';

export default (React) => connect((state) => {
    const person = state.get('resource').toJS();

    return {
        person: {
            id: person.id,
            displayName: person.displayName,
            name: person.name,
            links: person.links,
            avatar: person.thumbnail
        }
    };
})(createPerson(React));
