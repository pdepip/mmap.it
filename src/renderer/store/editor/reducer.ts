import { Reducer } from 'redux';
import { EditorState, EditorActionTypes } from './types';

// Type-safe initialStaet
export const initialState: EditorState = {
    title: '',
    markdown: '',
    id: '',
    loading: false,
    justSaved: false,
};

const reducer: Reducer<EditorState> = (state = initialState, action) => {
    switch (action.type) {
    case EditorActionTypes.SET_TITLE: {
            return { ...state, title: action.payload };
        }
    case EditorActionTypes.SET_MARKDOWN: {
            return { ...state, markdown: action.payload };
        }
    case EditorActionTypes.SAVE_SUCCESS: {
        return { ...state, markdown: '', title: '', justSaved: true };
    }
    case EditorActionTypes.TOGGLE_JUST_SAVED: {
        return { ...state, justSaved: !state.justSaved };
    }
    case EditorActionTypes.CLEAR_DOC: {
        return { ...initialState }
    }
    default: {
            return state;
        }
    }
};

export { reducer as editorReducer };
