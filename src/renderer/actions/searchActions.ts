import { Action, ActionCreator } from 'redux';

export enum SearchActionTypes {
    SET_SEARCH_QUERY = 'SET_SEARCH_QUERY'
}

interface SetSearchQueryAction {
    readonly type: SearchActionTypes.SET_SEARCH_QUERY;
    readonly query: string;
}

const setSearchQuery = (query: string): SetSearchQueryAction => ({
    type: SearchActionTypes.SET_SEARCH_QUERY,
    query
});

export type SearchAction = SetSearchQueryAction;
