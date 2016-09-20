/*global window */
import ga from 'react-ga';
import {remountContent} from './renderer';
import {configureStore} from '../shared/store/create';
import {configure as defineDependencies} from './dependencies';
import {addHistoryListener} from './history-listener';

const store = configureStore(JSON.parse(window.__INITIAL_STATE__));

ga.initialize('UA-2890413-9');
defineDependencies();
addHistoryListener(store);
remountContent(store);
