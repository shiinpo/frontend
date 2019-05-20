import { Reducer } from 'redux';
import {
    AuthActions,
    AuthActionTypes,
  } from './actions';

// Define the Catergory state
export interface IAuthState {
    readonly username: string,
    readonly email: string,
    readonly id: number,
    readonly loading: boolean,
    readonly jwt: boolean,
}

// Define the initialState
const initialAuthState: IAuthState = {
    username: "",
    email: "",
    id: 0,
    loading: false,
    jwt: false,
}

export const authReducer: Reducer<IAuthState, AuthActions> = (
    state = initialAuthState,
    action
) => {
    switch (action.type) {
        case AuthActionTypes.AUTH_LOADING: {
            return {
                ...state,
                loading: action.loading
            }
        }
        case AuthActionTypes.LOGOUT: {
            return {
                ...initialAuthState
            }
        }
        case AuthActionTypes.LOGIN_FAILURE: {
            return {
                ...initialAuthState
            }
        }
        case AuthActionTypes.LOGIN_SUCCESFUL: {
            return {
                ...state,
                username: action.username,
                email: action.username,
                id: action.id,
                jwt: true,
                loading: false,
            }
        }
        default:
            return state;
    }
};
