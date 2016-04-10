import {connect} from 'react-redux';
import resource from './user.jsx';

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
})(resource(React));
