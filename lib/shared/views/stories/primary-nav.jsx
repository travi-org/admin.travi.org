'use strict';

const
    React = require('react'),
    storiesOf = require('@kadira/storybook').storiesOf,

    PrimaryNav = require('../theme/primary-nav.jsx')(React);

require('../../../../resources/scss/theme.scss');

storiesOf('Primary Nav', module)
    .add('empty nav', () => <PrimaryNav primaryNav={[]}/>)
    .add('populated nav', () => <PrimaryNav primaryNav={[
        { text: 'rides' },
        { text: 'users' }
    ]}/>);
