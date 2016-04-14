import { configure } from '@kadira/storybook';

function loadStories() {
    require('../lib/shared/views/stories/primary-nav.jsx');
    require('../lib/shared/views/stories/resource-list.jsx');
    require('../lib/shared/views/stories/resource.jsx');
}

configure(loadStories, module);