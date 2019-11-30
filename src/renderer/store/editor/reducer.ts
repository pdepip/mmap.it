import { Reducer } from 'redux';
import { EditorState, EditorActionTypes } from './types';

// Type-safe initialStaet
export const initialState: EditorState = {
    title: '',
    markdown: '',
    loading: false
};

const reducer: Reducer<EditorState> = (state = initialState, action) => {
    switch (action.type) {
    case EditorActionTypes.SET_TITLE: {
            return { ...state, title: action.payload };
        }
    case EditorActionTypes.SET_MARKDOWN: {
            return { ...state, markdown: action.payload };
        }
    default: {
            return state;
        }
    }
};

export { reducer as editorReducer };
