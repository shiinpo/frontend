// Import redux types
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';

// Import apiURL from store
import { apiURL } from '../../store/Store'

// Import Auth Typing
import { IAuthState } from './reducer';

// Create Action Constants
export enum AuthActionTypes {
    AUTH_LOADING = 'AUTH_LOADING',
    LOGIN_SUCCESFUL = 'LOGIN_SUCCESFUL',
    LOGIN_FAILURE = 'LOGIN_FAILURE',
    LOGOUT = 'LOGOUT',
}

//////////////////////////////////////
// INTERFACE ACTION PAYLOADS
//////////////////////////////////////


//////////////////////////////////////
/// INTERFACE ACTION TYPE
//////////////////////////////////////

// Interface for AuthLoading Action Type
export interface IAuthLoadingAction {
    type: AuthActionTypes.AUTH_LOADING,
    loading: boolean
}
// Interface for LoginSuccess Action Type
export interface IAuthLoginSuccessAction {
    type: AuthActionTypes.LOGIN_SUCCESFUL;
    username: string,
    email: string,
    id: number,
}
// Interface for LoginFailure Action Type
export interface IAuthLoginFailureAction {
    type: AuthActionTypes.LOGIN_FAILURE;
}
// Interface for Logout Action Type
export interface IAuthLogoutAction {
    type: AuthActionTypes.LOGOUT;
}



/* 
Combine the action types with a union (we assume there are more)
example: export type CategoryActions = IGetAllAction | IGetOneAction ... 
*/
export type AuthActions = 
    IAuthLoadingAction 
    | IAuthLoginSuccessAction 
    | IAuthLoginFailureAction 
    | IAuthLogoutAction;

/* Login Action Creator
<Promise<Return Type>, State Interface, Type of Param, Type of Action> */
export const login: ActionCreator<ThunkAction<Promise<any>, IAuthState, null, IAuthLoginSuccessAction>
> = (username:string, password:string) => {
    return async (dispatch: Dispatch) => {
        try {
            const response = await axios.post(
                `${apiURL}/login`, 
                { username, password },
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            if (response.status === 200) {
                const { username, email, id } = response.data;
                dispatch({
                type: AuthActionTypes.LOGIN_SUCCESFUL,
                username,
                email,
                id
                });
            } else {
                dispatch({
                    type: AuthActionTypes.LOGIN_FAILURE,
                });
            }

        } catch (err) {
            console.error(err);
        }
    };
};