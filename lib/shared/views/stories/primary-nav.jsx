import React from 'react';
import {storiesOf} from '@kadira/storybook';
import createPrimaryNav from '../theme/primary-nav.jsx';

const PrimaryNav = createPrimaryNav(React);

require('../../../../resources/scss/theme.scss');

storiesOf('Primary Nav', module)
    .add('empty nav', () => <PrimaryNav primaryNav={[]}/>)
    .add('populated nav', () => <PrimaryNav primaryNav={[
        { text: 'rides' },
        { text: 'users' }
    ]}/>);
