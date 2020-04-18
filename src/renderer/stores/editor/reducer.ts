import { Reducer } from 'redux';
import { EditorState, EditorActionTypes } from './types';

// Type-safe initialStaet
export const initialState: EditorState = {
    title: '',
    markdown: '',
    id: '',
    loading: false,
    renderIdx: 0,
};

const reducer: Reducer<EditorState> = (state = initialState, action) => {
    switch (action.type) {
    case EditorActionTypes.SET_ID: {
        return { ...state, id: action.payload };
    }
    case EditorActionTypes.FORCE_RENDER: {
        return { ...state, renderIdx: state.renderIdx + 1 }
    }
    case EditorActionTypes.SET_TITLE: {
        return { ...state, title: action.payload };
    }
    case EditorActionTypes.SET_MARKDOWN: {
        return { ...state, markdown: action.payload };
    }
    case EditorActionTypes.SAVE_SUCCESS: {
        return { 
            ...state, 
            id: '', 
            markdown: '', 
            title: '', 
            renderIdx: state.renderIdx + 1};
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
