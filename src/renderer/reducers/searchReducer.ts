import { Reducer } from 'redux';
import { SearchActionTypes, SearchAction } from '../actions/searchActions';

export interface SearchState {
    readonly query: string;
}

const defaultState: SearchState = {
    query: ''
};

export const searchReducer: Reducer<SearchState> = (
    state: SearchState = defaultState,
    action: SearchAction
) => {
    console.log('query', action.query);
    switch (action.type) {
        case SearchActionTypes.SET_SEARCH_QUERY:
            return {
                ...state,
                query: action.query
            };
        default:
            return state;
    }
};
