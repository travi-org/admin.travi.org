import {connect} from 'react-redux';
import {provideHooks} from 'redial';
import {createPerson} from '@travi/admin.travi.org-components';

function fetch() {
    return Promise.resolve();
}

function mapStateToProps(state) {
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
}

export default (React) => connect(mapStateToProps)(provideHooks({fetch})(createPerson(React)));
