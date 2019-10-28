import { Reducer } from 'redux';
import Actions from '../actions';

export interface SearchState {
    readonly value: string;
}

const defaultState: SearchState = {
    value: ""
};

export const searchReducer: Reducer<SearchState> = (
    state = defaultState,
    action: SearchAction
) => {
    switch (action.type) {
        case Actions.SET_SEARCH_QUERY:
            return {
                ...state,
                value: action.query,
            };
        default:
            return state;
    }
};
