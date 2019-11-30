import { action } from 'typesafe-actions';

import { SearchActionTypes } from './types';

export const setQuery = (query: string) => action(SearchActionTypes.SET_QUERY, query);

export const queryRequest = (document: Document) => action(SearchActionTypes.QUERY_REQUEST, document)
export const querySuccess = (data: any) => action(SearchActionTypes.QUERY_SUCCESS, data)
export const queryError = (message: string) => action(SearchActionTypes.QUERY_ERROR, message)
