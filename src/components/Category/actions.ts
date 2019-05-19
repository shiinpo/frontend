// Import redux types
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';

// Import Category Typing
import { ICategory, ICategoryState } from './reducer';

// Import apiURL from store
import { apiURL } from '../../store/Store'

// Create Action Constants
export enum CategoryActionTypes {
    GET_ALL = 'GET_ALL',
}

// Interface for Get All Action Type
export interface ICategoryGetAllAction {
    type: CategoryActionTypes.GET_ALL;
    categories: ICategory[];
}

/* 
Combine the action types with a union (we assume there are more)
example: export type CategoryActions = IGetAllAction | IGetOneAction ... 
*/
export type CategoryActions = ICategoryGetAllAction;

/* Get All Action
<Promise<Return Type>, State Interface, Type of Param, Type of Action> */
export const getAllCategories: ActionCreator<
  ThunkAction<Promise<any>, ICategoryState, null, ICategoryGetAllAction>
> = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get(`${apiURL}/category/all`);
      dispatch({
        categories: response.data,
        type: CategoryActionTypes.GET_ALL,
      });
    } catch (err) {
      console.error(err);
    }
  };
};
