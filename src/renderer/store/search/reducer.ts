import { Reducer } from 'redux';
import { SearchState, SearchActionTypes, Document } from './types';

const demores: Document[] = [
    <Document>{
        id: 0,
        title: 'Postgres all tables row count',
        text: 'To accomplish run ````Select *```',
        score: 0.8,
    },
    <Document>{
        id: 1,
        title: 'comet instructions',
        text: 'this is how to set up',
        score: 0.3,
    },
    <Document>{
        id: 2,
        title: 'k8s port forarding',
        text: '# Shit this workign?',
        score: 0.1,
    },

]

// Type-safe initialStaet
export const initialState: SearchState = {
    query: '',
    loading: false,
    activeIdx: 0,
    documents: [],
    markdown: '',
};

const reducer: Reducer<SearchState> = (state = initialState, action) => {
    switch (action.type) {
    case SearchActionTypes.SET_QUERY: {
        return { 
            ...state, 
            query: action.payload,
            activeIdx: action.payload == '' ? 0 : state.activeIdx,
        };
    }
    case SearchActionTypes.INCREASE_ACTIVE_IDX: {
        return { ...state, activeIdx: state.activeIdx + 1 }
    }
    case SearchActionTypes.DECREASE_ACTIVE_IDX: {
        return { ...state, activeIdx: state.activeIdx - 1 }
    }
    case SearchActionTypes.QUERY_SUCCESS: {
        return { ...state, documents: action.payload };
    }
    case SearchActionTypes.OPEN_DOCUMENT: {
        return { ...state, }
    }
    default: {
            return state;
        }
    }
};

export { reducer as searchReducer };
