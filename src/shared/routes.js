import React from 'react';
import {Route, IndexRoute} from 'react-router';

import {NotFound, Index} from '@travi/admin.travi.org-components';
import Wrap from './views/theme/wrap/component';
import ResourceList from './views/resources/list/connected-list';
import Person from './views/persons/individual/component';
import Resource from './views/resources/individual/connected-resource';

export function getRoutes() {
  return (
    <Route path="/" component={Wrap}>
      <IndexRoute component={Index} />
      <Route path="/:type" component={ResourceList} />
      <Route path="/persons/:id" component={Person} />
      <Route path="/:type/:id" component={Resource} />
      <Route path="*" component={NotFound} />
    </Route>
  );
}
