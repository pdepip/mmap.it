import { Action, ActionCreator } from 'redux';

export enum SearchActionTypes {
    SET_SEARCH_QUERY = 'SET_SEARCH_QUERY'
}

interface SetSearchQueryAction {
    readonly type: SearchActionTypes.SET_SEARCH_QUERY;
    readonly query: string;
}

export const setSearchQuery = (query: string): SetSearchQueryAction => ({
    query,
    type: SearchActionTypes.SET_SEARCH_QUERY
});

export type SearchAction = SetSearchQueryAction;
