import { action } from 'typesafe-actions';

import { EditorActionTypes, Document } from './types';

export const setTitle = (title: string) => action(EditorActionTypes.SET_TITLE, title);
export const setMarkdown = (markdown: string) => action(EditorActionTypes.SET_MARKDOWN, markdown);

export const saveRequest = (document: Document) => action(EditorActionTypes.SAVE_REQUEST, document)
export const saveSuccess = (data: any) => action(EditorActionTypes.SAVE_SUCCESS, data)
export const saveError = (message: string) => action(EditorActionTypes.SAVE_ERROR, message)

export const toggleJustSaved = () => action(EditorActionTypes.TOGGLE_JUST_SAVED)
