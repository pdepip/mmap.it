import { combineReducers } from 'redux';

import { SearchState, searchReducer } from './searchReducer';

export interface RootState {
    search: SearchState;
}

export const rootReducer = combineReducers<RootState | undefined>({
    search: searchReducer
});
