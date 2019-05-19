import { Reducer } from 'redux';
import {
    CategoryActions,
    CategoryActionTypes,
  } from '../actions/categoryActions';

// Define the Category type 
export interface ICategory {
    id: number,
    name: string
}

// Define the Catergory state
export interface ICategoryState {
    readonly categories: ICategory[];
}

// Define the initialState
const initialCategoryState: ICategoryState = {
    categories: [],
}

export const categoryReducer: Reducer<ICategoryState, CategoryActions> = (
    state = initialCategoryState,
    action
) => {
    switch (action.type) {
        case CategoryActionTypes.GET_ALL: {
            return {
                ...state,
                categories: action.categories,
            }
        }
        default:
            return state;
    }
};
