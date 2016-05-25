import React from 'react';
import {Route, IndexRoute} from 'react-router';

import {createNotFound, createIndex} from '@travi/admin.travi.org-components';
import createWrap from './views/theme/wrap/connected-wrap.jsx';
import createResourceList from './views/resources/list/connected-list.jsx';
import createUser from './views/resources/individual/users/connected-user.jsx';
import createResource from './views/resources/individual/connected-resource.jsx';

const
    Wrap = createWrap(React),
    Index = createIndex(React),
    ResourceList = createResourceList(React),
    Resource = createResource(React),
    User = createUser(React),

    NotFound = createNotFound(React);

export default (hydrate) => (
    <Route path="/" component={Wrap}>
        <IndexRoute component={Index} />
        <Route path="/:type" component={ResourceList} onEnter={hydrate} />
        <Route path="/users/:id" component={User} onEnter={hydrate} />
        <Route path="/:type/:id" component={Resource} onEnter={hydrate} />
        <Route path="*" component={NotFound}/>
    </Route>
);
