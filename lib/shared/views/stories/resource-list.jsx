import React from 'react';
import {storiesOf} from '@kadira/storybook';
import createResourceList from '../resources/list/maybe-list.jsx';

const ResourceList = createResourceList(React);

storiesOf('Resource List', module)
    .add('empty list', () => <ResourceList resourceType="foo" resources={[]}/>)
    .add('rides list', () => <ResourceList resourceType="rides" resources={[
        { id: 1, displayName: 'corvette', links: [] },
        { id: 2, displayName: 'truck', links: [] },
        { id: 3, displayName: 'camaro', links: [] }
    ]}/>)
    .add('users list', () => <ResourceList resourceType="users" resources={[
        {
            id: 1,
            displayName: 'Matt Travi',
            thumbnail: {src: 'https://www.gravatar.com/avatar/f69785efc7d990da20f1ab49fc2a6648?size=32'},
            links: []
        }
    ]}/>);
