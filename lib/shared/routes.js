import React from 'react';
import {Route, IndexRoute} from 'react-router';

import {createNotFound, createIndex} from '@travi/admin.travi.org-components';
import createWrap from './views/theme/wrap/connected-wrap';
import createResourceList from './views/resources/list/connected-list';
import createUser from './views/resources/persons/individual/component';
import createResource from './views/resources/individual/connected-resource';

const
    Wrap = createWrap(React),
    Index = createIndex(React),
    ResourceList = createResourceList(React),
    Resource = createResource(React),
    Person = createUser(React),

    NotFound = createNotFound(React);

export default (hydrate) => (
    <Route path="/" component={Wrap}>
        <IndexRoute component={Index} />
        <Route path="/:type" component={ResourceList} onEnter={hydrate} />
        <Route path="/persons/:id" component={Person} onEnter={hydrate} />
        <Route path="/:type/:id" component={Resource} onEnter={hydrate} />
        <Route path="*" component={NotFound}/>
    </Route>
);
