import { action } from 'typesafe-actions';
import { ipcRenderer } from 'electron';

import { 
    EditorActionTypes, 
    Document, 
    EditorMode,
} from './types';

export const setTitle = (title: string) => action(EditorActionTypes.SET_TITLE, title);
export const setMarkdown = (markdown: string) => action(EditorActionTypes.SET_MARKDOWN, markdown);
export const setId = (id: string) => action(EditorActionTypes.SET_ID, id);

export const saveRequest = (document: Document) => action(EditorActionTypes.SAVE_REQUEST, document)
export const saveSuccess = (data: any) => action(EditorActionTypes.SAVE_SUCCESS, data)
export const saveError = (message: string) => action(EditorActionTypes.SAVE_ERROR, message)

export const toggleJustSaved = () => action(EditorActionTypes.TOGGLE_JUST_SAVED)

export const clearDoc = () => action(EditorActionTypes.CLEAR_DOC)

export const setEditorMode = (mode: EditorMode) => action(EditorActionTypes.SET_MODE, mode)
