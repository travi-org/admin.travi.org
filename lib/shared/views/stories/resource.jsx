import React from 'react';
import {storiesOf} from '@kadira/storybook';
import createResource from '../resources/individual/resource.jsx';
import createUser from '../resources/individual/users/user.jsx';

const Resource = createResource(React);
const User = createUser(React);

require('./theme-for-webpack.scss');

const user = {
    id: 1,
    name: {
        first: 'Matt',
        last: 'Travi'
    },
    displayName: 'Matt Travi',
    avatar: {
        src: 'https://www.gravatar.com/avatar/f69785efc7d990da20f1ab49fc2a6648?size=320',
        size: 320
    },
    links: []
};

storiesOf('Resource Details', module)
    .add('user', () => <User user={user}/>);
