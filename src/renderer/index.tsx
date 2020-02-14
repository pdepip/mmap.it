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

ReactDOM.render(<App store={store} history={history} />, mainElement);
