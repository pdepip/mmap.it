import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { ipcRenderer } from 'electron';

import App from './app';
import configureStore from './configureStore';

const history = createBrowserHistory();

// Create root element
const mainElement = document.createElement('div');
mainElement.className = 'root';
document.body.appendChild(mainElement);

const initialState = window.INITIAL_REDUX_STATE;
const store = configureStore(history, initialState);


import { clearDoc } from './stores/editor/actions';
import { clearSearch, setQuery } from './stores/search/actions';


ipcRenderer.on('rnd::clear-doc', (e) => {
    store.dispatch(clearDoc());
})

ipcRenderer.on('rnd::clear-search', (e) => {
    store.dispatch(clearSearch())
    store.dispatch(setQuery(""))
});

ipcRenderer.on('rnd::hide-search', (e) => {
    ipcRenderer.send('kb::hide-search');
});

ipcRenderer.on('rnd::hide-editor', (e) => {
    ipcRenderer.send('kb::hide-editor');
});


ReactDOM.render(<App store={store} history={history} />, mainElement);
