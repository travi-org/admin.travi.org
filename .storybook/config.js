import { configure } from '@kadira/storybook';

function loadStories() {
    require('../lib/shared/views/stories/primary-nav.jsx');
}

configure(loadStories, module);