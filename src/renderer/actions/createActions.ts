import { Action, ActionCreator } from 'redux';
//import db from '../yunodb';

export enum CreateActionTypes {
    SET_TITLE = 'SET_TITLE',
    SET_TEXT = 'SET_TEXT',
    SAVE_BIT = 'SAVE_BIT'
}

interface SetTitleAction {
    readonly type: CreateActionTypes.SET_TITLE;
    readonly title: string;
}

interface SetTextAction {
    readonly type: CreateActionTypes.SET_TEXT;
    readonly text: string;
}

interface SaveBitAction {
    readonly type: CreateActionTypes.SAVE_BIT;
}

function done(err) {
    if (err) throw err;
    console.log('successfully added 1 documents');
}

export const saveBit = (): any => {
    const title: string = 'count rows in all postgres tables';
    const text: string = '```SELECT * FROM tables;```';
    //db.add([{title, text}]);
};

/*
export const saveBit = (): SaveBitAction => ({
    type: CreateActionTypes.SAVE_BIT
});
 */

export const setTitle = (title: string): SetTitleAction => ({
    title,
    type: CreateActionTypes.SET_TITLE
});

export const setText = (text: string): SetTextAction => ({
    text,
    type: CreateActionTypes.SET_TEXT
});

export type CreateAction = SetTitleAction | SetTextAction; //| SaveBitAction;
