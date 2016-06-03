import {connect} from 'react-redux';
import {createWrap} from '@travi/admin.travi.org-components';

export default (React) => connect((state) => ({primaryNav: state.get('primaryNav').toJS()}))(createWrap(React));
