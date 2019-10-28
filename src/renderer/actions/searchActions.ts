import { Action, ActionCreator } from 'redux';

export enum SearchActionTypes {
    SET_SEARCH_QUERY = 'SET_SEARCH_QUERY',
}

export function setSearchQuery(query: string) {
    return { 
        type: SET_SEARCH_QUERY, 
        query 
    };
}

/*
export const update: ActionCreator<UpdateAction> = (value) => ({
    type: UPDATE,
    value: value
});
*/

//export type SearchAction = UpdateAction;
