import { action } from 'typesafe-actions';
import { ipcRenderer } from 'electron';

import { 
    EditorActionTypes, 
    Document, 
} from './types';

export const setTitle = (title: string) => action(EditorActionTypes.SET_TITLE, title);
export const setMarkdown = (markdown: string) => action(EditorActionTypes.SET_MARKDOWN, markdown);
export const setId = (id: string) => action(EditorActionTypes.SET_ID, id);

export const saveRequest = (document: Document) => action(EditorActionTypes.SAVE_REQUEST, document)
export const saveSuccess = (data: any) => action(EditorActionTypes.SAVE_SUCCESS, data)
export const saveError = (message: string) => action(EditorActionTypes.SAVE_ERROR, message)

export const clearDoc = () => action(EditorActionTypes.CLEAR_DOC)

export const forceRender = () => action(EditorActionTypes.FORCE_RENDER)
