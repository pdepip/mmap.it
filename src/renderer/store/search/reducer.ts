import { Reducer } from 'redux';
import { SearchState, SearchActionTypes } from './types';

// Type-safe initialStaet
export const initialState: SearchState = {
    query: '',
    loading: false,
};

const reducer: Reducer<SearchState> = (state = initialState, action) => {
    switch (action.type) {
    case SearchActionTypes.SET_QUERY: {
            return { ...state, query: action.payload };
        }
    default: {
            return state;
        }
    }
};

export { reducer as searchReducer };
