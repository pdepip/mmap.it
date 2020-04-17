// Action types for the editor
export enum EditorActionTypes {
    SET_MARKDOWN = '@@editor/SET_MARKDOWN',
    SET_ID = '@@editor/SET_ID',
    SET_TITLE = '@@editor/SET_TITLE',
    SAVE_REQUEST = '@@editor/SAVE_REQUEST',
    SAVE_SUCCESS = '@@editor/SAVE_SUCCESS',
    SAVE_ERROR = '@@editor/SAVE_ERROR',
    CLEAR_DOC = '@@editor/CLEAR_DOC',
    SET_MODE = '@@editor/SET_MODE',
    FORCE_RENDER = '@@editor/FORCE_RENDER',
}

export enum EditorMode {
    CREATE = "CREATE",
    UPDATE = "UPDATE",
}

export interface Document {
    id: string
    title: string
    markdown: string
}

// State
export interface EditorState {
    readonly loading: boolean;
    readonly markdown: string;
    readonly id: string;
    readonly title: string;
    readonly errors?: string;
    readonly mode: EditorMode;
    readonly renderIdx: number;
}
