import {connect} from 'react-redux';
import {provideHooks} from 'redial';
import {Person} from '@travi/admin.travi.org-components';
import {loadPerson} from './duck';

function fetch({dispatch, params}) {
  return dispatch(loadPerson(params.id));
}

function mapStateToProps(state) {
  const person = state.getIn(['person', 'person']).toJS();

  return {
    person: {
      id: person.id,
      displayName: person.displayName,
      name: person.name,
      links: person.links,
      avatar: person.thumbnail
    },
    loading: state.getIn(['person', 'loading'])
  };
}

export default connect(mapStateToProps)(provideHooks({fetch})(Person));
