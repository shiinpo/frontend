import { Reducer } from 'redux';
import {
    CategoryActions,
    CategoryActionTypes,
  } from './actions';

// Define the Category type 
export interface ICategory {
    id: number,
    name: string
}

export interface ICategoryState {
    [key: number]: ICategory
}

// Define the initialState
const initialCategoryState: ICategoryState = {}

export const categoryReducer: Reducer<ICategoryState, CategoryActions> = (
    state = initialCategoryState,
    action
) => {
    switch (action.type) {
        case CategoryActionTypes.GET_ALL_CATEGORIES:
            return action.categories;
        default:
            return state;
    }
};
