import {connect} from 'react-redux';
import resource from './resource.jsx';

export default (React) => connect((state) => {
    return {
        resource: state.get('resource').toJS()
    };
})(resource(React));
