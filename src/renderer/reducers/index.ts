import { combineReducers } from 'redux';

import { SearchState, searchReducer } from './searchReducer';
import { EditorState, editorReducer } from './editorReducer';

export interface RootState {
    search: SearchState;
    editor: EditorState;
}

export const rootReducer = combineReducers<RootState | undefined>({
    search: searchReducer,
    editor: editorReducer
});
