import { Reducer } from 'redux';
import {
    ProgressActions,
    ProgressActionTypes,
  } from './actions';

export interface IRecord{
    id: number,
    weight: number,
    reps: number,
    rpe: number,
    date_performed: string,
    exercise_id: number,
    user_id: number
}

// Define the Progress state
export interface IProgressState {
    readonly records: IRecord[];
}

// Define the initialState
const initialProgressState: IProgressState = {
    records: [],
}

export const progressReducer: Reducer<IProgressState, ProgressActions> = (
    state = initialProgressState,
    action
) => {
    switch (action.type) {
        case ProgressActionTypes.GET_ALL: {
            return {
                ...state,
                records: action.records,
            }
        }
        default:
            return state;
    }
};
