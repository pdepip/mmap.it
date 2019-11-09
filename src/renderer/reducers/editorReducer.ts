import { Reducer, Action } from 'redux';
import { EditorActionTypes, EditorAction } from '../actions/editorActions';

export interface EditorState {
    readonly title: string;
    readonly text: string;
}

const defaultState: EditorState = {
    title: '',
    text: ''
};

export const editorReducer: Reducer<EditorState> = (
    state: EditorState = defaultState,
    incomingAction: Action
) => {
    const action = incomingAction as EditorAction;
    console.log(action);
    switch (action.type) {
        case EditorActionTypes.SET_TITLE:
            return {
                ...state,
                title: action.title
            };
        case EditorActionTypes.SET_TEXT:
            return {
                ...state,
                text: action.text
            };
        default:
            return state;
    }
};
