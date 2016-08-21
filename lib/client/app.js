/*global window */
import {remountContent} from './renderer';
import {configureStore} from '../shared/store/create';
import {configure as defineDependencies} from './dependencies';
import {addHistoryListener} from './history-listener';

const store = configureStore(JSON.parse(window.__INITIAL_STATE__));

defineDependencies();
addHistoryListener(store);
remountContent(store, 'UA-2890413-9');
