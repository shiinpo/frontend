// Import redux types
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';

// Import Record, Progress Typing
import { IRecord, IProgressState } from './reducer';

// Import apiURL from store
import { apiURL } from '../../store/Store'

// Create Action Constants
export enum ProgressActionTypes {
    GET_ALL = 'GET_ALL',
}

// Interface for Get All Action Type
export interface IRecordGetAllAction {
    type: ProgressActionTypes.GET_ALL;
    records: IRecord[];
}

/* 
Combine the action types with a union (we assume there are more)
example: export type ProgressActions = IGetAllAction | IGetOneAction ... 
*/
export type ProgressActions = IRecordGetAllAction;

/* Get All Action
<Promise<Return Type>, State Interface, Type of Param, Type of Action> */
export const getAllRecords: ActionCreator<
  ThunkAction<Promise<any>, IProgressState, null, IRecordGetAllAction>
> = () => {
  return async (dispatch: Dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${apiURL}/record/all`,
        {
          headers: {
            Authorization: token
          }
        }
      );
      dispatch({
        records: response.data,
        type: ProgressActionTypes.GET_ALL,
      });
    } catch (err) {
      console.error(err);
    }
  };
};
