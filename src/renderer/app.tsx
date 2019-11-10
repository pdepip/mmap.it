import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

import Application from './components/Application';
import store from './store';

// Create main element
const mainElement = document.createElement('div');
mainElement.className = 'root';
document.body.appendChild(mainElement);

// Get args to determine what window to render
const params = new URLSearchParams(window.location.search);
const type = params.get('type');

// Render components
ReactDOM.render(
    <AppContainer>
        <Provider store={store as any}>
            <Application type={type} />
        </Provider>
    </AppContainer>,
    mainElement
);
