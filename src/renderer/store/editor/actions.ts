import { action } from 'typesafe-actions';

import { EditorActionTypes } from './types';

export const setTitle = (title: string) => action(EditorActionTypes.SET_TITLE, title);
export const setMarkdown = (markdown: string) => action(EditorActionTypes.SET_MARKDOWN, markdown);
