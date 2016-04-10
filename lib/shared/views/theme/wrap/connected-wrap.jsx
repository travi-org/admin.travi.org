import {connect} from 'react-redux';
import wrap from './wrap.jsx';

export default (React) => connect((state) => {
    return {
        primaryNav: state.get('primaryNav').toJS()
    };
})(wrap(React));
