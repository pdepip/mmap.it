// Action types for the search
export enum SearchActionTypes {
    SET_QUERY = '@@search/SET_QUERY',
    QUERY_REQUEST = '@@search/QUERY_REQUEST',
    QUERY_SUCCESS = '@@search/QUERY_SUCCESS',
    QUERY_ERROR = '@@search/QUERY_ERROR',
    INCREASE_ACTIVE_IDX = '@@search/INCREASE_ACTIVE_IDX',
    DECREASE_ACTIVE_IDX = '@@search/DECREASE_ACTIVE_IDX',
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
}
