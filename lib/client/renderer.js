/*global document */

import React from 'react';
import dom from 'react-dom';
import Wrapper from './wrapper';
import { AppContainer } from 'react-hot-loader';

function renderIntoDom(store) {
    dom.render(
        <AppContainer>
            <Wrapper store={store}/>
        </AppContainer>,
        document.getElementById('wrap')
    );
}

export function remountContent(store) {
    renderIntoDom(store);

    if (module.hot) {
        module.hot.accept('./temp', () => {
            renderIntoDom(store);
        });
    }
}
