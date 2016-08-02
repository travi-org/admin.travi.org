import React from 'react';
import {Route, IndexRoute} from 'react-router';

import {createNotFound, createIndex} from '@travi/admin.travi.org-components';
import createWrap from './views/theme/wrap/connected-wrap';
import createResourceList from './views/resources/list/connected-list';
import createPerson from './views/persons/individual/component';
import createResource from './views/resources/individual/connected-resource';

const
    Wrap = createWrap(React),
    Index = createIndex(React),
    ResourceList = createResourceList(React),
    Resource = createResource(React),
    Person = createPerson(React),

    NotFound = createNotFound(React);

export default (
    <Route path="/" component={Wrap}>
        <IndexRoute component={Index} />
        <Route path="/:type" component={ResourceList} />
        <Route path="/persons/:id" component={Person} />
        <Route path="/:type/:id" component={Resource} />
        <Route path="*" component={NotFound}/>
    </Route>
);
