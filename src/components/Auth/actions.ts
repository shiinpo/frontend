// Import redux types
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

// Import apiURL from store
import { apiURL } from '../../store/Store'

// Import Auth Typing
import { IAuthState } from './reducer';
import { IExercise } from '../Progress/reducer';
import { ProgressActionTypes } from '../Progress/actions';
import { ICategoryState, ICategory } from '../Category/reducer';
import { CategoryActionTypes } from '../Category/actions';

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

export interface IDecodedToken {
    email: string,
    exp: number,
    id: number,
    username: string,
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
> = (username:string, password:string, email:string) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch({ type: AuthActionTypes.AUTH_LOADING});
            const response = await axios.post(
                `${apiURL}/login`, 
                { username, password },
            );

            if (response.status === 200) {
                setUserInfo(response.data, dispatch);
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

/* Register Action Creator
<Promise<Return Type>, State Interface, Type of Param, Type of Action> */
export const register: ActionCreator<ThunkAction<Promise<any>, IAuthState, null, IAuthLoginSuccessAction>
> = (username:string, password:string, email:string) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch({ type: AuthActionTypes.AUTH_LOADING});
            const response = await axios.post(
                `${apiURL}/register`, 
                { username, password, email },
            );

            if (response.status === 200) {
                const { token } = response.data;

                localStorage.setItem('token', token);

                const decoded:IDecodedToken = jwtDecode(token);
                const { username, email, id } = decoded;

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

export const logout = () => {
    localStorage.removeItem("token")
    return ({ type: AuthActionTypes.LOGOUT })
}

export const setUserInfo = (userInfo:any, dispatch:Dispatch) => {
    const { token, user, records, categories, exercises } = userInfo;
    const { username, email, id } = user;
    localStorage.setItem('token', token);

    let exer:{[key: number]: IExercise} = {};
    exercises.forEach((ex:IExercise) => {
        if (!exer[ex.id]) {
            exer[ex.id] = ex;
        }
    })

    let categoriesObj:ICategoryState = {};
    categories.forEach((cat:ICategory) => {
        categoriesObj[cat.id] = cat
    });
    
    dispatch({
        type: AuthActionTypes.LOGIN_SUCCESFUL,
        username,
        email,
        id
    });
    dispatch({
        records,
        type: ProgressActionTypes.GET_ALL,
    });
    dispatch({
        type: ProgressActionTypes.GET_ALL_EX,
        exercises: exer,
    });
    dispatch({
        type: CategoryActionTypes.GET_ALL_CATEGORIES,
        categories: categories,
    });
}

export const getUserInfo: ActionCreator<ThunkAction<Promise<any>, IAuthState, null, IAuthLoginSuccessAction>
> = () => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch({ type: AuthActionTypes.AUTH_LOADING});
            const token = localStorage.getItem("token");
            const response = await axios.get(
                `${apiURL}/user`,
                {
                  headers: {
                    Authorization: token
                  }
                }
              );

            if (response.status === 200) {
                setUserInfo(response.data, dispatch);
            } else {
                dispatch({
                    type: AuthActionTypes.LOGIN_FAILURE,
                });
            }

        } catch (err) {
            console.error(err);
        }
    };
}
