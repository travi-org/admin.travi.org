import React from 'react';
import dom from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import Wrapper from './wrapper';

function renderIntoDom(store) {
  dom.render(
    <AppContainer>
      <Wrapper store={store} />
    </AppContainer>,
    document.getElementById('wrap')
  );
}

export default function (store) {
  renderIntoDom(store);

  if (module.hot) {
    module.hot.accept('./wrapper', () => renderIntoDom(store));
  }
}
