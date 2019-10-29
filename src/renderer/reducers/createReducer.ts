import { Reducer, Action } from 'redux';
import { CreateActionTypes, CreateAction } from '../actions/createActions';

export interface CreateState {
    readonly title: string;
    readonly text: string;
}

const defaultState: CreateState = {
    title: '',
    text: ''
};

export const createReducer: Reducer<CreateState> = (
    state: CreateState = defaultState,
    incomingAction: Action
) => {
    const action = incomingAction as CreateAction;
    console.log(action);
    switch (action.type) {
        case CreateActionTypes.SET_TITLE:
            return {
                ...state,
                title: action.title
            };
        case CreateActionTypes.SET_TEXT:
            return {
                ...state,
                text: action.text
            };
        default:
            return state;
    }
};
