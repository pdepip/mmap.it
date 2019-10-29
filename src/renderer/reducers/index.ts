import { combineReducers } from 'redux';

import { SearchState, searchReducer } from './searchReducer';
import { CreateState, createReducer } from './createReducer';

export interface RootState {
    search: SearchState;
    create: CreateState;
}

export const rootReducer = combineReducers<RootState | undefined>({
    search: searchReducer,
    create: createReducer
});
