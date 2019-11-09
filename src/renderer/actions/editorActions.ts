import { Action, ActionCreator } from 'redux';
// import db from '../yunodb';

export enum EditorActionTypes {
    SET_TITLE = 'SET_TITLE',
    SET_TEXT = 'SET_TEXT',
    SAVE_BIT = 'SAVE_BIT'
}

interface SetTitleAction {
    readonly type: EditorActionTypes.SET_TITLE;
    readonly title: string;
}

interface SetTextAction {
    readonly type: EditorActionTypes.SET_TEXT;
    readonly text: string;
}

interface SaveBitAction {
    readonly type: EditorActionTypes.SAVE_BIT;
}

function done(err) {
    if (err) throw err;
    console.log('successfully added 1 documents');
}

export const saveBit = (): any => {
    const title: string = 'count rows in all postgres tables';
    const text: string = '```SELECT * FROM tables;```';
    // db.add([{title, text}]);
};

/*
export const saveBit = (): SaveBitAction => ({
    type: EditorActionTypes.SAVE_BIT
});
 */

export const setTitle = (title: string): SetTitleAction => ({
    title,
    type: EditorActionTypes.SET_TITLE
});

export const setText = (text: string): SetTextAction => ({
    text,
    type: EditorActionTypes.SET_TEXT
});

export type EditorAction = SetTitleAction | SetTextAction; // | SaveBitAction;
