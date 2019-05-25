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
    max: number,
    date_performed: string,
    exercise_id: number,
    user_id: number
}

export interface IExercise{
    id: number
    name: string
    category_id: number
}

// Define the Progress state
export interface IProgressState {
    readonly records: IRecord[];
    readonly exercises: {[key: number]: IExercise}
}

// Define the initialState
const initialProgressState: IProgressState = {
    records: [],
    exercises: {},
}

export const progressReducer: Reducer<IProgressState, ProgressActions> = (
    state = initialProgressState,
    action
) => {
    switch (action.type) {
        case ProgressActionTypes.GET_ALL: {
            return {
                ...state,
                records: action.records.sort((a, b) => a.exercise_id - b.exercise_id || a.max - b.max),
            }
        }
        case ProgressActionTypes.GET_ALL_EX: {
            return {
                ...state,
                exercises: action.exercises
            }
        }
        default:
            return state;
    }
};
