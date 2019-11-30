import { applyMiddleware, createStore, Store, combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';
import { connectRouter, RouterState } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';

import { editorReducer } from './editor/reducer';
import { EditorState } from './editor/types';
import editorSaga from './editor/sagas';

// Top level state object
export interface ApplicationState {
    editor: EditorState;
}

// Whenevr an action is dispatched, redux will update each top-level applciation state property
// using the reducer with the mathcing name, It's important that the names match exactly, and that
// the reducer acts on the corresponding ApplicationState property type.
export const createRootReducer = (history: History) =>
    combineReducers({
        editor: editorReducer,
        router: connectRouter(history)
    });

// Here we use redux-saga to trigger action asynchrnonously. redux-saga uses generator functions
export function* rootSaga() {
    yield all([fork(editorSaga)]);
}
