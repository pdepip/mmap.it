// Action types for the search
export enum SearchActionTypes {
    SET_QUERY = '@@search/SET_QUERY',
    QUERY_REQUEST = '@@search/QUERY_REQUEST',
    QUERY_SUCCESS = '@@search/QUERY_SUCCESS',
    QUERY_ERROR = '@@search/QUERY_ERROR',
    INCREASE_ACTIVE_IDX = '@@search/INCREASE_ACTIVE_IDX',
    DECREASE_ACTIVE_IDX = '@@search/DECREASE_ACTIVE_IDX',
    SET_ACTIVE_IDX = '@@search/SET_ACTIVE_IDX',
    OPEN_DOCUMENT = '@@search/OPEN_DOCUMENT',
    CLEAR_SEARCH = '@@search/CLEAR_SEARCH',
    DELETE_DOCUMENT = '@@search/DELETE_DOCUMENT',
    DELETE_DOCUMENT_BY_ID = '@@search/DELETE_DOCUMENT_BY_ID',
    PREPEND_DOCUMENT = '@@search/PREPEND_DOCUMENT',
    UPDATE_DOCUMENT = '@@search/UPDATE_DOCUMENT',
    FORCE_RENDER = '@@search/FORCE_RENDER',
}

export interface Document {
    id: number;
    title: string;
    text: string;
    score: number;
}

// State
export interface SearchState {
    readonly loading: boolean;
    readonly query: string;
    readonly errors?: string;
    readonly documents: Document[];
    readonly activeIdx: number;
    readonly markdown: string;
    readonly renderIdx: number;
}
