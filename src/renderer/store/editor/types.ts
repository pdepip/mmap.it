// Action types for the editor
export enum EditorActionTypes {
    SET_MARKDOWN = '@@editor/SET_MARKDOWN',
    SET_TITLE = '@@editor/SET_TITLE',
    SAVE_REQUEST = '@@editor/SAVE_REQUEST',
    SAVE_SUCCESS = '@@editor/SAVE_SUCCESS',
    SAVE_ERROR = '@@editor/SAVE_ERROR'
}

export interface Document {
    title: string
    markdown: string
}

// State
export interface EditorState {
    readonly loading: boolean;
    readonly markdown: string;
    readonly title: string;
    readonly errors?: string;
}
