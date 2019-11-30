import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

import store from './store';
import { ApplicationState } from './store';
import Routes from './routes';

// Get args to determine what window to render
const params = new URLSearchParams(window.location.search);
const page = params.get('type');

interface AppProps {
    store: Store<ApplicationState>;
    history: History;
}

const App: React.FC<AppProps> = ({ store, history }) => {
    return (
        <AppContainer>
            <Provider store={store}>
                <Routes page={page} />
            </Provider>
        </AppContainer>
    );
};

export default App;
