import { Action, ActionCreator } from 'redux';

export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';

export const setSearchQuery = (query: string) => {
    return { type: SET_SEARCH_QUERY, query }
}

/*
export const update: ActionCreator<UpdateAction> = (value) => ({
    type: UPDATE,
    value: value
});
*/

//export type SearchAction = UpdateAction;
