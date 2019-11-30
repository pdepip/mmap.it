// Action types for the search
export enum SearchActionTypes {
    SET_QUERY = '@@search/SET_QUERY',
    QUERY_REQUEST = '@@search/QUERY_REQUEST',
    QUERY_SUCCESS = '@@search/QUERY_SUCCESS',
    QUERY_ERROR = '@@search/QUERY_ERROR',
}

// State
export interface SearchState {
    readonly loading: boolean;
    readonly query: string;
    readonly errors?: string;
}
