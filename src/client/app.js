/* eslint no-underscore-dangle: ["error", { "allow": ["__INITIAL_STATE__"] }] */
import ga from 'react-ga';
import remountContent from './renderer';
import {configureStore} from '../shared/store/create';
import defineDependencies from './dependencies';
import addHistoryListener from './history-listener';

const store = configureStore({initialState: window.__INITIAL_STATE__});

ga.initialize('UA-2890413-9');
defineDependencies();
addHistoryListener(store);
remountContent(store);
