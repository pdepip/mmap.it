import { Reducer, Action } from 'redux';
import { SearchActionTypes, SearchAction } from '../actions/searchActions';

export interface SearchState {
    readonly query: string;
    readonly markdown: string;
}

const defaultState: SearchState = {
    query: '',
    markdown: ''
};

export const searchReducer: Reducer<SearchState> = (
    state: SearchState = defaultState,
    incomingAction: Action
) => {
    const action = incomingAction as SearchAction;
    console.log('quer', action);
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
