import { Action, ActionCreator } from 'redux';

export enum CreateActionTypes {
    SET_TITLE = 'SET_TITLE',
    SET_TEXT = 'SET_TEXT'
}

interface SetTitleAction {
    readonly type: CreateActionTypes.SET_TITLE;
    readonly title: string;
}

interface SetTextAction {
    readonly type: CreateActionTypes.SET_TEXT;
    readonly text: string;
}

export const setTitle = (title: string): SetTitleAction => ({
    title,
    type: CreateActionTypes.SET_TITLE
});

export const setText = (text: string): SetTextAction => ({
    text,
    type: CreateActionTypes.SET_TEXT
});

export type CreateAction = SetTitleAction | SetTextAction;
