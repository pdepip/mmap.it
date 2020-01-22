import { action } from 'typesafe-actions';

import { SearchActionTypes, Document } from './types';

export const setQuery = (query: string) => action(SearchActionTypes.SET_QUERY, query);

export const queryRequest = (document: Document) => action(SearchActionTypes.QUERY_REQUEST, document)
export const querySuccess = (data: Document[]) => action(SearchActionTypes.QUERY_SUCCESS, data)
export const queryError = (message: string) => action(SearchActionTypes.QUERY_ERROR, message)

export const activeIdxIncrease = () => action(SearchActionTypes.INCREASE_ACTIVE_IDX)
export const activeIdxDecrease = () => action(SearchActionTypes.DECREASE_ACTIVE_IDX)

export const openDocument = () => action(SearchActionTypes.OPEN_DOCUMENT)

export const clearSearch = () => action(SearchActionTypes.CLEAR_SEARCH)
